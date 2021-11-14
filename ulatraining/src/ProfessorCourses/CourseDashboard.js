import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"

export default function CourseDashboard(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid;

    const [modules, setModules] = useState(false);
    const [users, setUsers] = useState({});

    useEffect(() => {
        // only call once because state changes are unlikely, and this is an expensive operation
        database.ref('users').orderByChild('role').equalTo('student').once('value').then(snapshot => {
            if (snapshot.exists())  // yes, it will exist
            {
                let _users = { };
                const val = snapshot.val();
                for (const uid in val)
                {
                    // Add the user to the users object
                    if (val[uid].courses && val[uid].courses[cid])
                    {
                        _users[uid] = val[uid];
                    }
                }
                setUsers(_users);
            }
        });

        database.ref(`courses/${cid}/modules`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                let modules = snapshot.val()
                setModules(modules);
            } else {
                console.log(`Course ${cid} has no modules`)
            }
        })
    }, []);

    const handleDeleteCourse = (cid) => {
        let courseRef = database.ref(`courses/${cid}`)
        courseRef.remove().then(function() {
            window.alert("Course Removed")
            window.location.href=`/professor-courses`
        }).catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
        let userCourseRef = database.ref(`users/${currentUser.uid}/${cid}`)

    }
    return <div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <div className="coursesHeader">Students</div>
                    {
                        // fill in onclick later
                        Object.keys(users).map((uid) =>
                            <div className="course">{users[uid].firstName + ' ' + users[uid].lastName}</div>
                        )
                    }
                </Grid>

                <Grid item xs={3}>
                    <div className="coursesHeader">Progress</div>
                    {
                        Object.keys(users).map((uid) => {
                            let percentage = Math.round(Object.values(users[uid].courses[cid].modules).reduce((prev, next) => prev + next) / Object.keys(users[uid].courses[cid].modules).length);
                            return percentage === 100 ? 
                            <div className="completedCourse">
                            {
                                Math.round(Object.values(users[uid].courses[cid].modules).reduce((prev, next) => prev + next) / Object.keys(users[uid].courses[cid].modules).length) + "%"
                            }
                            </div> :
                            <div className="course">
                            {
                                Math.round(Object.values(users[uid].courses[cid].modules).reduce((prev, next) => prev + next) / Object.keys(users[uid].courses[cid].modules).length) + "%"
                            }
                            </div>
                        }
                        )
                    }
                </Grid>

                <Grid item xs={2}>
                    <div className="editClass" onClick={event => window.location.href=`/course-admin/edit-course/${cid}`}>edit course</div>
                    <div className="deleteClass">
                        <button
                        className="deleteButton"
                        onClick={() => {
                            const confirmBox = window.confirm(
                                "Do you really want to delete this course?"
                            )
                            if (confirmBox === true) {
                                handleDeleteCourse(cid)
                            }
                        }}>delete course
                        </button>
                    </div>
                </Grid>

                <Grid item xs={7}>
                    <div className="modulesHeader">Modules</div>
                    {
                        Object.keys(modules).map(mid => {
                            return <div className='course' key={mid}>{modules[mid].name}</div>
                        })
                    }
                </Grid>
                <Grid item xs={2}>
                    <div className="deleteModule" onClick={event => window.location.href=`/course-admin/create-module/${cid}`}>create module</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="deleteModule" onClick={event => window.location.href=`/course-admin/delete-module/${cid}`}>delete modules</div>
                </Grid>

            </Grid>
        </Box>
    </div>;
}

