import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './MyCourses.css';

export default function SelectCourse(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(true);

    const loadAllCourses = () => {
        database.ref('courses').on("value", (snapshot) => {
            if (snapshot.exists()) {
                let snap = snapshot.val();
                let _courses = {...courses};
                for (const key in snap)
                {
                    _courses[key] = snap[key].name;
                }
                setCourses(_courses);
            }
        });
    }

    const removeUserCourses = () => {
        database.ref('users').child(currentUser.uid).child('courses').on('value', snapshot => {
            if (snapshot.exists())
            {
                let myCourses = snapshot.val();
                let _courses = {...courses};
                for (const c in myCourses)
                {
                    if (courses[c])
                        delete _courses[c];
                }
                setCourses(_courses);
                setLoading(false)
            }
            else
            {
                console.log('no courses');
                setLoading(false)
            }
        });
    }



    useEffect(() => {
        if (loading) {
            loadAllCourses();
            removeUserCourses();
        }
    }, [courses]);


    const handleAddcourse = (course) => {
        database.ref('courses').child(course).once('value').then(snapshot => {
            if (snapshot.exists())
            {
                let content = snapshot.val();
                for (const mod in content.modules)
                {
                    content.modules[mod] = 0;
                }
                database.ref('users').child(currentUser.uid).child('courses').child(course).set(content);
            }
        });
        //setLoading(true);
    };

    /*const handleAddCourse = (course) => {
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
    */
    if (loading) {
        return null;
    }
    return (<div className="container">
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <div className="coursesHeader">classes</div>
                    {Object.keys(courses).map((cid) => {
                        return (<div className="course" key={cid} >{courses[cid]}</div>)
                    })}
                </Grid>
                <Grid item xs={2}>
                    <div className="addCourseHeader">.</div>
                    {Object.keys(courses).map(cid => {
                        return (<div className="addCourse" key={cid} onClick={() => handleAddcourse(cid)}>add</div>)
                    })}
                </Grid>
            </Grid>
        </Box>
    </div>);


    /*if (loading && courses) {
        return null;
    }
    return (
    <div className="container">
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <div className="coursesHeader">classes</div>
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
    )*/
};
