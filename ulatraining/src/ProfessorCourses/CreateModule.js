import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css';
import { useParams } from 'react-router-dom'

export default function CreateModule(props) {
    let courseID = useParams().cid;
    // const {currentUser} = useAuth();
    const database = props.database;
    const storage = props.storage;
    const [courses, setCourses] = useState({});
    const [type, setType] = useState("text");
    const [modName, setModName] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(undefined);

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

    const handleCreateModule = event => {
        let newModule = database.ref('courses').child(courseID).child('modules').push();
        newModule.set({
            name: modName,
            content: text,
            type: 'text',
        });

        database.ref('users').once('value', snapshot => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                for (const uid in val) {
                    if (val[uid].courses && val[uid].courses[courseID]) {
                        database.ref(`users/${uid}/courses/${courseID}/modules/${newModule.key}`).set(0);
                    }
                }
            }
        })
        window.location.href=`/course-admin/${courseID}`;
    };

    const handleFileUpload = event => {
        if (file)
        {
            // Upload video to storage
            let storageRef = storage.ref('courses').child(courseID).child('modules').child(file.name);
            storageRef.put(file).then(snapshot => {
                storageRef.getDownloadURL().then(url => {
                    let newModule = database.ref('courses').child(courseID).child('modules').push();
                    newModule.set({
                        name: modName,
                        content: url, // some sort of identifier to the firebase file
                        type: 'video',
                    });

                    database.ref('users').orderByChild('role').equalTo('student').once('value', snap => {
                        if (snapshot.exists()) {
                            const val = snap.val();
                            for (const uid in val) {
                                if (val[uid].courses && val[uid].courses[courseID]) {
                                    database.ref('users').child(uid).child('courses').child(courseID).child('modules').child(newModule.key).set(0);
                                }
                            }
                        }
                    })
                    window.location.href=`/course-admin/${courseID}`;
                })
            });
        }

        else {
            // No file selected
        }


    };

    return (<div className="container">
        <div className="createModuleHeader">Create a Module</div>
        <form>
            <select id="typeSelect" value={type} onChange={event => setType(event.target.value)}>
                <option id="TextSelect" value="text">Text</option>
                <option id="videoSelect" value="video">Video</option>
            </select><br/>
            <label className="p-2 rounded bg-blue-300"> Module Title:</label>
            <input className="bg-gray-300 border-black" type="text" value={modName} onChange={event => setModName(event.target.value)} name="moduleTitle" id="moduleTitleInput"></input><br></br>
            <label> Module Content</label>
            {
                (type == 'text')
                ? <div>
                    <textarea className="bg-gray-300 border-black" rows="4" cols="50" name="moduleContent" id="moduleContentInput"></textarea><br></br>
                    <button id="submitTextButton" className="p-2 rounded bg-gray-400" type="button" onClick={handleCreateModule}>Submit</button>
                </div>
                : <div>
                    <input type="file" onChange={event => setFile(event.target.files[0])} />
                    <button id="submitFileButton" className="p-2 rounded bg-gray-400" type="button" onClick={handleFileUpload}>Submit</button>
                </div>
            }
        </form>
    </div>);

}
