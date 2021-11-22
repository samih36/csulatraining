import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Button } from 'react-bootstrap';
import '../Module.css'
//import { useParams } from "react-router-dom";

export default function VideoModule(props)
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
        <Button className='backButton' href={`/course/${cid}`}>Back</Button>
        <div className="contentContainer">
            <h2 className='moduleName'>{_module.name}</h2>
            <video src={_module.content} width="760" controls></video>
        </div>
        <br/>
        <Button className='advanceButton' value='Advance' onClick={handleAdvanceClick}>Advance</Button>
    </div>;
}
