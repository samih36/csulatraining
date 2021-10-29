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
    const [completed, setCompleted] = useState(false);
    const [nextModule, setNextModule] = useState(undefined);
    const [loading, setLoading] = useState(true)
;
    useEffect(() => {
        database.ref('courses').child(cid).child('modules').once('value').then(snapshot => {
            let moduleIndex = Object.keys(snapshot.val()).indexOf(mid);
            if (moduleIndex === Object.keys(snapshot.val()).length - 1 || moduleIndex === -1) {
                setNextModule(false);
            } else {
                setNextModule(Object.keys(snapshot.val())[moduleIndex + 1]);
            }
        });

        database.ref('courses').child(cid).child('modules').child(mid).once('value').then(snapshot => {
            if (snapshot.exists()) {
                setModule(snapshot.val());
            } else setCompleted(true);
        });

        setLoading(false);
    }, []);

    if (loading || nextModule === undefined) {
        return null;
    }

    // if (completed)
    //     return <div>
    //         <h1>You have completed this course!</h1>
    //         <input type='button' value='Return to Course Home' onClick={event => window.location.href = `/course/${cid}`}/>
    //     </div>;

    if (_module.type === "text")
        return <ReadingModule key={mid} database={database} mid={mid} cid={cid} content={_module} nextModule={nextModule} />
    else if (_module.type === "quiz")
        return <QuizComponent key={mid} database={database} mid={mid} cid={cid} uid={currentUser.uid} content={_module} nextModule={nextModule} />
    else return null;
}
