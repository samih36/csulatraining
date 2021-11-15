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
        database.ref('users').orderByChild('role').equalTo('student').once('value', snapshot => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                for (const uid in val) {
                    if (val[uid].courses && val[uid].courses[courseID]) {
                        database.ref('users').child(uid).child('courses').child(courseID).child('modules').child(newModulePush.key).set(0);
                    }
                }
            }
        })
        window.location.href=`/course-admin/${courseID}`

    };

    return (<div className="container">

        <div className="createModuleHeader">Create a Module</div>
        <form>
            <label className="p-2 rounded bg-blue-300"> Module Title:</label>
            <input className="bg-gray-300 border-black" type="text" name="moduleTitle" id="moduleTitleInput"></input><br></br>
            <label> Module Content</label>
            <textarea className="bg-gray-300 border-black" rows="4" cols="50" name="moduleContent" id="moduleContentInput"></textarea><br></br>
            <button className="p-2 rounded bg-gray-400" type="button" onClick={event=>handleCreateModule(document.getElementById("moduleTitleInput").value, document.getElementById("moduleContentInput").value)}>Submit</button>
        </form>

    </div>);
}