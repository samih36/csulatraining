import React, { useState, useEffect } from 'react';
import { useAuth } from "./contexts/AuthContext";
import ReadingModule from './Text/ReadingModule.js';
import QuizComponent from './Quiz/QuizComponent.js';

export default function Module(props)
{
    const { currentUser } = useAuth();
    const database = props.database;
    const cid = props.cid;
    const mod = props.mod;

    const [_module, setModule] = useState({});

    useEffect(() => {
        console.log(cid);
        console.log(mod);
        database.ref('courses').child(cid).child('modules').child(mod).once('value').then(snapshot => {
            if (snapshot.exists())
                setModule(snapshot.val());
        });
    });

    if (_module.type == "text")
        return <ReadingModule key={mod} database={database} mod={mod} cid={cid} content={_module}/>
    else if (_module.type == "quiz")
        return <QuizComponent key={mod} database={database} mod={mod} cid={cid} content={_module}/>
    else return null;
}
