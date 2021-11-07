import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import 'tailwindcss/tailwind.css'

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


        database.ref(`users/${currentUser.uid}/courses/${newCoursePush.key}`).set({
            'name': courseName,
            'professor': currentUser.uid
        })
    };

    return (<div className="container">

        <div className="createCourseHeader mt-24 bg-blue-300 rounded-full mx-44">Create a Course</div>
        <form>
            <label className="courseTitleLabel ">Course Title:</label>
            <input className="outline-black bg-gray-400 my-4" type="text" name="courseTitle" id="courseTitleInput"></input><br></br>
            <button className="submitButton bg-gray-400" type="button" onClick={event=>handleCreateCourse(document.getElementById("courseTitleInput").value)}>Submit</button>
        </form>

    </div>);
}