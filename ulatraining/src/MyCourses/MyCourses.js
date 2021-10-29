import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';


export default function MyCourses(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});

    useEffect(() => {
        database.ref('users').child(currentUser.uid).child('courses').on('value', snapshot => {
            if (snapshot.exists())
            {
                setCourses(snapshot.val());
            }
        });
    }, []);

    return (
        <div className="container">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <div className="coursesHeader">courses</div>

                        {Object.keys(courses).map((cid) => {
                            return (<div className="course" onClick={event => window.location.href=`/course/${cid}`}>{courses[cid].name}</div>)
                        })}
                    </Grid>
                    <Grid item xs={3}>
                        <div className="coursesHeader">Progress</div>
                        {Object.keys(courses).map((cid) => {
                            return (<div className="course">0%</div>)
                        })}
                    </Grid>
                    <Grid item xs={2}>
                        <div className="addClass" onClick={event => window.location.href='add-course'}>add course</div>
                    </Grid>

                </Grid>
            </Box>
        </div>
    );

}
