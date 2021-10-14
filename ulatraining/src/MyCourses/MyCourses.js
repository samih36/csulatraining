import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './MyCourses.css';


export default function MyCourses() {

    const handleCourseClick = () => {

    }

    return (
    <div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="coursesHeader">classes</div>
                    {/* hard coding a class in now, will later fetch the classes of the user and dynamically render*/}
                    <div className="course">COMP XXX</div>
                </Grid>
                <Grid item xs={3}>
                    <div className="coursesHeader" onClick={handleCourseClick}>Progress</div>
                    <div className="course">0%</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="addClass">add class</div>
                </Grid>

            </Grid>
        </Box>
    </div>
    )
};