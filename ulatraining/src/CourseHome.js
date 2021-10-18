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
    useEffect(() => {
        database.ref('courses').once("value").then((snapshot) => {
            if (snapshot.child(courseID).child('modules').exists()) {
                setModules(snapshot.child(courseID).child('modules').val());

            } else {
                console.log("no modules")
            }
        });
    });

    return(
        <div>
            <div>Modules</div>
            {Object.keys(modules).map((mid) => {
                return (<div className="course" onClick={event => window.location.href=`/course/${courseID}/${mid}`}>{modules[mid].name}</div>)
            })}
        </div>
    )
}