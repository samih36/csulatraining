import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useParams } from 'react-router-dom';
import './EditableTextStyle.css';
import  TextareaAutosize  from 'react-textarea-autosize';

export default function EditableText(props, path, cName = "container", fontSize = 64, maxLen = 15, width = 15) {
    const {currentUser} = useAuth();
    const database = props.database;
    let cid = useParams().cid;

    const [text, setText] = useState("");
    const [editing, setEditing] = useState(false);
    let style = {
        "fontSize": fontSize
    }
    useEffect(() => {
        database.ref(path).once('value').then(snapshot =>{
            if(snapshot.exists()) {
              setText(snapshot.val());
            }
          })
    }, []);

    const keyDown = (e) => {
        if (e.key == 'Enter') changeTextInDatabase(e.target.value);
    }

    const changeTextInDatabase = (value) => {
        setText(value);
        setEditing(false);
        database.ref(path).set(text);
    }

    const textChanged = (e) => {
        setText(e.target.value);
    }

    const textNotEditing = () => {
        return <p style = {style} onDoubleClick = {() => setEditing(true)}>{text} </p>;
    };

    const textEditing = () => {
        
        return <TextareaAutosize cols={width} className = "editable-text-editing" style = {style} maxLength = {maxLen} onKeyDown = {keyDown} value = {text} onChange = {textChanged}></TextareaAutosize>
    }

    return <div className = {cName}>
        <div className = 'editable-text'>
            {editing ? textEditing() : textNotEditing()}
        </div>
    </div>;
}