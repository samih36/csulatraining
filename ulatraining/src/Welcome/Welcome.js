import React from 'react';
import './Welcome.css'

function Welcome() {

    const handleStudentButtonClick = () => {
        window.location.href='/login/student'
    }

    const handleProfessorButtonClick = () => {
        window.location.href='/login/professor'
    }

    return (
        <div className="welcomeContainer">
        <h1 className="welcome">I am a...</h1>
        <div className="leftcolumn">
            <div className="button" onClick={handleStudentButtonClick}>Student</div>
        </div>
        <div className="rightcolumn">
            <div className="button" onClick={handleProfessorButtonClick}>Professor</div>
        </div>
        </div>
    )
        
}

export default Welcome;