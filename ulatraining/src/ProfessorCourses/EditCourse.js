import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"

export default function EditCourse(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid

    useEffect(() => {



    }, []);

    return <div>hi</div>
}
