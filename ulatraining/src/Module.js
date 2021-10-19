import React, { useState, useEffect } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from 'react-router-dom';
import ReadingModule from './Text/ReadingModule.js';
import QuizComponent from './Quiz/QuizComponent.js';

export default function Module(props)
{
    const { currentUser } = useAuth();
    const database = props.database;

    let { cid, mid } = useParams();

    const [_module, setModule] = useState({});

    useEffect(() => {
        console.log(cid);
        console.log(mid);
        database.ref('courses').child(cid).child('modules').child(mid).once('value').then(snapshot => {
            if (snapshot.exists())
                setModule(snapshot.val());
        });
    });

    if (_module.type == "text")
        return <ReadingModule key={mid} database={database} mod={mid} cid={cid} content={_module}/>
    else if (_module.type == "quiz")
        return <QuizComponent key={mid} database={database} mid={mid} cid={cid} uid={currentUser.uid} content={_module}/>
    else return null;
}
