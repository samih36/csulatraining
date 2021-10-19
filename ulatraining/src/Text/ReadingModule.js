import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function ReadingModule(props)
{
    const { currentUser } = useAuth();
    const database = props.database;
    const mid = props.mid;
    const cid = props.cid;
    const _module = props.content;

    const handleAdvanceClick = event => {
        console.log(mid)
        database.ref('users').child(currentUser.uid).child('courses').child(cid).child('modules').child(mid).set(100);
        window.location.href = `/course/${cid}/${mid + 1}`;
    };

    return <div>
        <input type='button' value='< Back' onClick={event => window.location.href = `/course/${cid}`}/>
        <h2>{_module.name}</h2>
        <p>{_module.content}</p>
        <br/>
        <input type='button' value='Advance' onClick={handleAdvanceClick}/>
    </div>;
}
