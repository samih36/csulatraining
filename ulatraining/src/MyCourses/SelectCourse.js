import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';

export default function SelectCourse(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            database.ref('courses').on("value", (snapshot) => {
                let ref = snapshot.val();
                for (let i = 0; i < Object.keys(ref).length; i++) {
                    courses.add(Object.keys(ref)[i]);
                }
                console.log([...courses]);
                // console.log(ref);
                // console.log(Object.keys(ref)[0]);
                // console.log(ref[Object.keys(ref)[0]].modules.length);
            });
            database.ref('students').on("value", (snapshot) => {
                let s = snapshot.val();
                let myCourses = s[currentUser.uid].courses 
                // console.log("my courses");
                // console.log(myCourses);
                // console.log(Object.keys(myCourses).length)
                if (myCourses == null) {
                    console.log('no courses')
                    console.log([...courses]);
                } else {
                    console.log([...courses]);
                    for (let j = 0; j < Object.keys(myCourses).length; j++) {
                        // console.log(Object.keys(myCourses)[j])
                        courses.delete(Object.keys(myCourses)[j])
                    }
                    // console.log('yo')
                    // console.log([...courses]);
                }
                setLoading(false);
            })
        }
    }, [loading, database, courses, currentUser.uid])

    const handleAddCourse = (course) => {
        // add course to the student, fill modules with zeros. 
        console.log('hey');
        let moduleLength = 0;
        database.ref('courses').on("value", (snapshot) => {
            let ref = snapshot.val();
            moduleLength = ref[course].modules.length;
            // console.log(moduleLength);
        });
        let coursesObj = {};
        for (let i = 0; i < moduleLength; i++) {
            coursesObj[i] = false;
        }
        // console.log(coursesObj);
        database.ref('students').on("value", (snapshot) => {
            let snap = snapshot.val();
            let myCourses = snap[currentUser.uid].courses;
            if (myCourses == null) {
                database.ref('students').child(currentUser.uid).update({ courses: { [course]:  coursesObj } });
            } else {
                database.ref('students').child(currentUser.uid).child('courses').update({ [course]: coursesObj });
            }
            setLoading(true);
        })

    }


    if (loading && courses) {
        return null;
    }
    return (
    <div className="container">
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <div className="coursesHeader">classes</div>
                    {/* hard coding a class in now, will later fetch the classes of the user and dynamically render*/}
                    {[...courses].map((course) => {
                        return (<div className="course" key={course} onClick={event => window.location.href='/course'}>{course}</div>)
                    })}
                </Grid>
                <Grid item xs={2}>
                    <div className="addCourseHeader">.</div>
                    {[...courses].map((course) => {
                        return (<div className="addCourse" key={course} onClick={() => handleAddCourse(course)}>add</div>)
                    })}
                </Grid>
            </Grid>
        </Box>
    </div>
    )
};