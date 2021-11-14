import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"

export default function CourseDashboard(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid;

    const [users, setUsers] = useState({});

    useEffect(() => {
        // only call once because state changes are unlikely, and this is an expensive operation
        database.ref('users').orderByChild('role').equalTo('student').once('value').then(snapshot => {
            if (snapshot.exists())  // yes, it will exist
            {
                console.log("snapshot exists");
                let _users = { };
                const val = snapshot.val();
                for (const uid in val)
                {
                    console.log(`student ${uid} exists`);
                    // Add the user to the users object
                    if (val[uid].courses && val[uid].courses[cid])
                    {
                        console.log(`student ${uid} is in the class`);
                        _users[uid] = val[uid];
                    }
                }
                console.log(_users);
                setUsers(_users);
            }
        });
    }, []);

    return <div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <div className="coursesHeader">Students</div>
                    <div className="course">Test Student 1</div>
                    <div className="course">Seymour Buts</div>
                    {
                        // fill in onclick later
                        Object.keys(users).map((uid) =>
                            <div className="course">{users[uid].firstName + ' ' + users[uid].lastName}</div>
                        )
                    }
                </Grid>

                <Grid item xs={2}>
                    <div className="coursesHeader">Progress</div>
                    <div className="completedCourse">100</div>
                    <div className="course">0</div>
                    {
                        Object.keys(users).map((uid) =>
                            <div className="course">
                                {
                                    Math.round(Object.values(users[uid].courses[cid].modules).reduce((prev, next) => prev + next) / Object.keys(users[uid].courses[cid].modules).length) + "%"
                                }
                            </div>
                        )
                    }
                </Grid>

                <Grid item xs={2}>
                    <div className="editClass" onClick={event => window.location.href=`/course-admin/edit-course/${cid}`}>edit course</div>
                    <div className="deleteClass" onClick={event => window.location.href=`/course-admin/delete-course/${cid}`}>delete course</div>
                </Grid>
            </Grid>
        </Box>
    </div>;
}

