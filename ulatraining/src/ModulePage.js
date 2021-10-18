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
    let module;
    database.ref('courses').once("value").then( snapshot => {
        if (snapshot.child(courseID).child("modules").child(moduleID).exists) {
            module = snapshot.child(courseID).child("modules").child(moduleID).val();
        }
    })
    console.log(module);

    return(
        <div>
            hello
        </div>
    )
}