import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from 'react-router-dom'

export default function ModulePage(props) {
    const {currentUser} = useAuth()
    const database = props.database;
    let params = useParams();
    let courseID = params.cid;
    let moduleID = params.mid;
    const [module, setModule] = useState({});
    useEffect(()=> {
        database.ref('courses').once("value").then( snapshot => {
            if (snapshot.child(courseID).child("modules").child(moduleID).exists) {
                setModule(snapshot.child(courseID).child("modules").child(moduleID).val());
            }
        })
    });



    return(
        <div>
            <div>{`${module.name}`}</div>
            <div>{`${module.content}`}</div>
        </div>

    )
}