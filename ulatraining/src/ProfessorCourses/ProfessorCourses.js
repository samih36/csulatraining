import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import "tailwindcss/tailwind.css"

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

                </Grid>

                <Grid item xs={4}>
                    <div className="coursesHeader" onClick={event => window.location.href='create-course'}>create course</div>
                </Grid>
            </Grid>
        </Box>
    </div>;
}
