import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import '../Module.css'

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
        window.location.href=`/professor-courses`
    };

    return (<div className="container">

        <div className="coursesHeader">Create a Course</div>
        <Form>
            <label className="courseTitleLabel">Course Title:</label>
            <Form.Control className="w-50 m-auto" type="text" name="courseTitle" id="courseTitleInput"></Form.Control><br></br>
            <Button className="advanceButton" type="button" onClick={event=>handleCreateCourse(document.getElementById("courseTitleInput").value)}>Submit</Button>
        </Form>

    </div>);
}