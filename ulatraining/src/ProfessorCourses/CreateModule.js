import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css';
import { useParams } from 'react-router-dom'

export default function CreateModule(props) {
    let courseID = useParams().cid;
    // const {currentUser} = useAuth();
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

    const handleCreateModule = (moduleName, moduleContent) => {
        let newModulePush = database.ref('courses').child(courseID).child("modules").push();
        newModulePush.set({
            name: moduleName,
            content: moduleContent,
            type: "text",
        })

    };

    return (<div className="container">

        <div className="createModuleHeader">Create a Module</div>
        <form>
            <label> Module Title:</label>
            <input type="text" name="moduleTitle" id="moduleTitleInput"></input><br></br>
            <label> Module Content</label>
            <textarea rows="4" cols="50" name="moduleContent" id="moduleContentInput"></textarea><br></br>
            <button type="button" onClick={event=>handleCreateModule(document.getElementById("moduleTitleInput").value, document.getElementById("moduleContentInput").value)}>Submit</button>
        </form>

    </div>);
}