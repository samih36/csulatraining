import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from 'react-router-dom'

export default function CourseHome(props) {
    let courseID = useParams().cid;

    const { currentUser } = useAuth();
    const database = props.database;
    const [modules, setModules] = useState({});
    let professor = false;
    useEffect(() => {
        database.ref('courses').once("value").then((snapshot) => {
            if (snapshot.child(courseID).child('modules').exists()) {
                setModules(snapshot.child(courseID).child('modules').val());
                
            } else {
                console.log("no modules")
            }
        });
    });

    const handleModuleCreate = () => {
        database.ref("courses").child(courseID).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().professor == currentUser.uid) {
                    return (<div>Add a module</div>)
                }
            }
        })
    }

    return(
        <div>
            <div>Modules</div>
            {Object.keys(modules).map((mid) => {
                // return (<div className="course" onClick={event => window.location.href=`/course/${courseID}/${mid}`}>{modules[mid].name}</div>)
                // (<div className="course" onClick={event => window.location.href=`/course/${courseID}/quiz/${mid}`}>{modules[mid].name}</div>)
                return (<div className="course" onClick={event => modules[mid]['type']==='text' ? window.location.href=`/course/${courseID}/${mid}` : window.location.href=`/course/${courseID}/quiz/${mid}`}>{modules[mid].name}</div>)
            })}
            <div>
                <h4>Create New Module:</h4>
                <button type = "button" onClick={event=>window.location.href=`/create-module/${courseID}`}>Reading</button>
                <button type = "button" onClick={event=>window.location.href=`/create-quiz/${courseID}`}>Quiz</button>

            </div>
            
        </div>
    )
}