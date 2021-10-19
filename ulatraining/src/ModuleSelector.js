import React, { useState, useEffect } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import Module from './Module.js';

export default function ModuleSelector(props)
{
    const { currentUser } = useAuth();
    const database = props.database;

    const { cid } = useParams();
    const [courseName, setCourseName] = useState("");
    const [index, setIndex] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        database.ref('courses').child(cid).child('name').once('value').then(snapshot => {
            if (snapshot.exists())
                setCourseName(snapshot.val());
        });

        // This will automatically refresh the module view after the current module is completed
        // Advancement through modules is handled in QuizComponent or ReadingModule by marking mod as complete
        database.ref('users').child(currentUser.uid).child('courses').child(cid).child('modules').on('value', snapshot => {
            if (snapshot.exists())
            {
                const modules = snapshot.val();
                let ix = 0;
                for (const mod in modules)
                {
                    if (modules[mod])
                        ix++;
                    else break;
                }
                if (ix == Object.keys(modules).length)
                    setCompleted(true);
                setIndex(ix);
            }
        });
    });

    if (completed)
        return <h1>Course Complete!</h1>
    else if (index !== "")
        return <div>
            <h1>{courseName}</h1>
            <hr/>
            <Module key={index} database={database} cid={cid} mod={index}/>
        </div>;
    else return null;
}
