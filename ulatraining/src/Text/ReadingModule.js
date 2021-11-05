import React from 'react';
import { useAuth } from "../contexts/AuthContext";
//import { useParams } from "react-router-dom";

export default function ReadingModule(props)
{
    const { currentUser } = useAuth();
    const database = props.database;
    const mid = props.mid;
    const cid = props.cid;
    const _module = props.content;
    const next = props.nextModule;


    const handleAdvanceClick = event => {
        database.ref('users').child(currentUser.uid).child('courses').child(cid).child('modules').child(mid).set(100);
        if (!next) {
            window.location.href = `/course/${cid}`;
        } else {
            window.location.href = `/course/${cid}/${next}`;
        }
    };

    return <div>
        <input type='button' value='< Back' onClick={event => window.location.href = `/course/${cid}`}/>
        <h2 className='moduleName'>{_module.name}</h2>
        <p className='moduleContent'>{_module.content}</p>
        <br/>
        <input type='button' value='Advance' onClick={handleAdvanceClick}/>
    </div>;
}
