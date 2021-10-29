import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'

export default function CreateCourse(props) {

    const {currentUser} = useAuth();
    const database = props.database;
    const [courses, setCourses] = useState({});

    useEffect(() => {
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

    }, []);

    const handleCreateCourse = (courseName) => {
        let newCoursePush = database.ref('courses').push();
        newCoursePush.set({
            'name': courseName,
            'professor': currentUser.uid
        })

    };

    return (<div className="container">

        <div className="createCourseHeader">Create a Course</div>
        <form>
            <label for="courseTitle"> Course Title:</label>
            <input type="text" name="courseTitle" id="courseTitleInput"></input><br></br>
            <button type="button" onClick={event=>handleCreateCourse(document.getElementById("courseTitleInput").value)}>Submit</button>
        </form>

    </div>);
}