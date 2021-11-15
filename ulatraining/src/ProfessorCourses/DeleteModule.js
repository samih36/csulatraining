import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"

export default function DeleteModule(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid
    const [modules, setModules] = useState(false);
    let checkedModules = []


    useEffect(() => {
        database.ref(`courses/${cid}/modules`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                let modules = snapshot.val()
                setModules(modules);
            } else {
                console.log(`Course ${cid} has no modules`)
            }
        })

    }, []);

    const handleOnChange = (e) => {
        let mid = e.target.value
        if (checkedModules.includes(mid)) {
           checkedModules = checkedModules.filter(item => item != mid)
        } else {
            checkedModules = [...checkedModules, mid]
        }
    }

    const handleDeleteModules = () => {
        if (checkedModules.length != 0) {
            checkedModules.forEach(mid => {
                let moduleRef = database.ref(`courses/${cid}/modules/${mid}`)

                database.ref('users').orderByChild('role').equalTo('student').once('value', snapshot => {
                    if (snapshot.exists()) {
                        const val = snapshot.val();
                        for (const uid in val) {
                            if (val[uid].courses && val[uid].courses[cid]) {
                                let userModules = val[uid]['courses'][cid]['modules'];
                                delete userModules[mid];
                                console.log(userModules)
                                database.ref('users').child(uid).child('courses').child(cid).child('modules').set(userModules);
                            }
                        }
                    }
                })

                moduleRef.remove().then(function() {
                    //Minor bug, modules removed alert pops up twice
                    window.alert("Modules Removed")
                    window.location.href=`/course-admin/${cid}`
                }).catch(function(error){
                    console.log("Remove failed: " + error.message)
                })
            })
        }
    }

    return <div className="container">
        <Box sx={{ flexGrow: 1}}>
            <Grid Container spacing={1}>
                <Grid item xs={7}>
                    <div className="coursesHeader">Modules</div>
                    {
                        Object.keys(modules).map(mid => {
                            return <div key={mid} className="course">
                                <input type='checkbox' value={mid} onChange={e => handleOnChange(e)}/>
                                {modules[mid].name}
                            </div>
                        })
                    }
                    <button className="p-2 rounded bg-gray-400" type="button" onClick={
                        event => {
                            const confirmBox = window.confirm(
                                "Do you really want to delete these modules?"
                            )
                            if (confirmBox === true) {
                                handleDeleteModules()
                            }
                        }
                    }>
                        Delete
                    </button>
                </Grid>
            </Grid>
        </Box>
    </div>
}