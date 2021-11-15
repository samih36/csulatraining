import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import './ProfessorCourses.css'
import { useParams } from 'react-router-dom';
import "tailwindcss/tailwind.css"
import EditableText from '../ReusableUtilities/EditableText';


export default function EditCourse(props) {

    const { currentUser } = useAuth();
    const database = props.database;
    let cid = useParams().cid;


    return <div className="course-view">
        {EditableText(props, 'courses/' + cid + '/' + 'name', "course-title")}
    </div>;
}
