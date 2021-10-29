import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';


export default function MyCourses(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});
    const [completion, setCompletion] = useState(false);
    const [passPercentage, setPassPercentage] = useState({});

    useEffect(() => {
        database.ref('users').child(currentUser.uid).child('courses').on('value', snapshot => {
            console.log(snapshot.val());
            if (snapshot.exists()) {
                setCourses(snapshot.val());

            }
            for(let courseID in courses) {
                let scores = {};
                let percentages = {};
                database.ref('users').child(currentUser.uid).child('courses').child(courseID).on('value', snapshot => {
                    console.log(snapshot.val().modules);
                    scores = snapshot.val().modules;
                })

        
                database.ref('courses').child(courseID).child('modules').on('value', snapshot => {
                    let quizzes = snapshot.val();
                    for(let key in quizzes) {
                        quizzes[key].type === 'quiz' ? percentages[key] = quizzes[key].passPercentage : percentages[key] = 1;
                    }
                })
                console.log('quiz');
                console.log(scores)
                console.log(percentages)
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
                            return (<div className="course" key={cid} onClick={event => window.location.href=`/course/${cid}`}>{courses[cid].name}</div>)
                        })}
                    </Grid>
                    <Grid item xs={3}>
                        <div className="coursesHeader">Progress</div>
                        {Object.keys(courses).map((cid) => {
                            return (<div key={cid} className="course">0%</div>)
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
