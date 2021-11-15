import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"
import EditableText from '../ReusableUtilities/EditableText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function EditCourse(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid;


    return <div className="course-view">
        <Grid container spacing = {3}>
            <Grid item xs={12}> {EditableText(props, 'courses/' + cid + '/' + 'name', "course-title")} </Grid>
            <Grid item xs={1}/><Grid item xs={10}> {EditableText(props, 'courses/' + cid + '/' + 'description', "course-description", 24, 500)} </Grid> <Grid item xs={1}/>
        </Grid>
    </div>;
}
