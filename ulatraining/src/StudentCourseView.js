import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from 'react-router-dom'

export default function StudentCourseView(props) {
    let courseID = useParams().cid;

    const { currentUser } = useAuth();
    const database = props.database;
    const [modules, setModules] = useState({});
    const [completion, setCompletion] = useState({});
    const [professor, setProfessor] = useState(false);
    useEffect(() => {
        database.ref('courses').child(courseID).child('modules').once('value').then(snapshot => {
            if (snapshot.exists())
            {
                setModules(snapshot.val());
            }
            else
            {
                console.log(`Course ${courseID} has no modules`);
            }
        });

        database.ref('courses').child(courseID).child('professor').once('value').then(snapshot => {
            setProfessor(snapshot.exists() && snapshot.val());
        });

                database.ref('users').child(currentUser.uid).child('courses').child(courseID).child('modules').once('value').then(snapshot => {
                    if (snapshot.exists())
                        setCompletion(snapshot.val());
                });
    });

    // This needs to be migrated to a new ProfessorCourseView
    // Or this component can be generalized
    // Commenting it out because it wasn't functional yet anyway
    // Sorry if i messed anything up
    /*
    const handleModuleCreate = () => {
        database.ref("courses").child(courseID).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().professor == currentUser.uid) {
                    return (<div>Add a module</div>)
                }
            }
        })
    }
    */

    const getColor = completion => {
        let pct = parseInt(completion);
        if (pct == 100)
            return '#32a852';
        else if (pct > 0)
            return '#4B9CD3';
        else return '#C8C8C8';
    };

    return(
        <div>
            <div>Modules</div>
            {
                Object.keys(modules).map(mid =>
                    <div className='course' style={{'backgroundColor': getColor(completion[mid])}} onClick={event => window.location.href=`/course/${courseID}/${mid}`}>{modules[mid].name}</div>
                )
            }

            {
                professor
                ? <div>
                    <h4>Create New Module:</h4>
                    <button type = "button" onClick={event=>window.location.href=`/create-module/${courseID}`}>Reading</button>
                    <button type = "button" onClick={event=>window.location.href=`/create-quiz/${courseID}`}>Quiz</button>
                </div>
                : null
            }

        </div>
    )
}
