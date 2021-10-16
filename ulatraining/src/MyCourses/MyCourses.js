import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';


export default function MyCourses(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        // database.ref('courses').on("value", (snapshot) => {
        //     let ref = snapshot.val();
        //     console.log(ref);
        //     console.log(Object.keys(ref)[0]);
        //     console.log(ref[Object.keys(ref)[0]].modules.length);
        // });

        database.ref('students').child(currentUser.uid).child('courses').on('value', snapshot => {
            if (snapshot.exists())
            {
                setCourses(snapshot.val());
            }
        });

        /*
        database.ref('students').on("value", (snapshot) => {
            let s = snapshot.val();
            // console.log(s[currentUser.uid]);
            let myCourses = s[currentUser.uid].courses
            if (myCourses == null) {
                console.log('no courses')
            } else {
                // console.log(myCourses);
                // console.log(Object.keys(myCourses).length);
                for (let i = 0; i < Object.keys(myCourses).length; i++) {
                    // console.log(Object.keys(myCourses).length)
                    courses.add(Object.keys(myCourses)[i]);
                    // console.log(courses);
                    // console.log([...courses][i])
                }
            }
            setLoading(false);
        })
        */
    });

    return (
        <div className="container">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <div className="coursesHeader">courses</div>
                        {/* hard coding a class in now, will later fetch the classes of the user and dynamically render*/}
                        {/*<div className="course" onClick={event => window.location.href='/course'} >COMP XXX</div>*/}
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

    /*
    if (loading) {
        return null;
    } else {
    return (
    <div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <div className="coursesHeader">courses</div>
                    {[...courses].map((course) => {
                        return (<div className="course" onClick={event => window.location.href='/course'}>{course}</div>)
                    })}
                </Grid>
                <Grid item xs={3}>
                    <div className="coursesHeader">Progress</div>
                    {[...courses].map((course) => {
                        return (<div className="course">0%</div>)
                    })}

                </Grid>
                <Grid item xs={2}>
                    <div className="addClass" onClick={event => window.location.href='add-course'}>add course</div>
                </Grid>

            </Grid>
        </Box>
    </div>
    )
    */
}
