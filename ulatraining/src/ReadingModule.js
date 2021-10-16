import React, { useState, useEffect } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function ReadingModule(props)
{
    const { currentUser } = useAuth();
    const database = props.database;
    const mod = props.mod;
    const cid = props.cid;
    const _module = props.content;

    const handleAdvanceClick = event =>
        database.ref('students').child(currentUser.uid).child('courses').child(cid).child('modules').child(mod).set(true);

    return <div>
        <h2>{_module.name}</h2>
        <p>{_module.content}</p>
        <br/>
        <input type='button' value='Advance' onClick={handleAdvanceClick}/>
    </div>;
}
