import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';


export default function MyCourses(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);

    const progressNotLoaded = () => {
        if (Object.keys(progress).length === 0) {
            return true;
        } else {
            for (let i = 0; i < Object.keys(progress).length; i++) {
                if (isNaN(progress[Object.keys(progress)[i]])) {
                    return true;
                }
            }
        }
        return false;
    }

    useEffect(() => {
        if (progressNotLoaded()) {
            database.ref('users').child(currentUser.uid).child('courses').on('value', snapshot => {
                if (snapshot.exists()) {
                    setCourses(snapshot.val());

                }
            });
            for(let courseID in courses) {
                let scores = courses[courseID].modules;
                let percentages = {};
                let passCount = 0;

        
                database.ref('courses').child(courseID).child('modules').on('value', snapshot => {
                    let quizzes = snapshot.val();
                    for(let key in quizzes) {
                        quizzes[key].type === 'quiz' ? percentages[key] = quizzes[key].passPercentage : percentages[key] = 1;
                    }
                })

                for(let module in scores) { 
                    if (scores[module] >= percentages[module]) {
                        passCount++;
                    }
                }
                progress[courseID] = Math.round(((passCount / Object.keys(percentages).length) * 100));
            }
        setLoading(false)
        }
    }, [courses]);

    if (loading) {
        return null;
    } else {
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
                                return progress[cid] === 100 ?
                                <div key={cid} className="completedCourse">{progress[cid]}% </div> :
                                <div key={cid} className="course">{progress[cid]}% </div>
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

}
