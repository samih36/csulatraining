import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'

export default function ProfessorCourses(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});

    // Only run once on component mount
    useEffect(() => {
        // Only consider courses where `professor` is equal to `uid`
        database.ref('courses').orderByChild('professor').equalTo(currentUser.uid).on('value', snapshot => {
            if (snapshot.exists())
                setCourses(snapshot.val());
        });

        // semi-old code that takes course directly from a professor's child courses
        // instead of checking that they own it
        /*
        database.ref('users').child(currentUser.uid).child('courses').on('value', snapshot => {
            if (snapshot.exists())
                setCourses(snapshot.val());
        });
        */
    }, []);

    return <div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <div className="coursesHeader">courses</div>

                    {
                        // Will need to add /course-admin/:cid route
                        Object.keys(courses).map((cid) =>
                            <div className="course" onClick={event => window.location.href=`/course-admin/${cid}`}>{courses[cid].name}</div>
                        )
                    }

                    {/*
                        // TODO make this go to a course-specific professor view
                        // List of all courses
                        {Object.keys(courses).map((cid) =>
                            <div className="course" onClick={event => window.location.href=`/course/${cid}`}>{courses[cid].name}</div>
                        )}
                    */}

                </Grid>
                {/*
                    <Grid item xs={3}>
                        <div className="coursesHeader">Progress</div>
                        {Object.keys(courses).map((cid) => {
                            return (<div className="course">0%</div>)
                        })}
                    </Grid>
                */}
                <Grid item xs={2}>
                    <div className="createClass" onClick={event => window.location.href='create-course'}>create course</div>
                </Grid>


            </Grid>
        </Box>
    </div>;
}
