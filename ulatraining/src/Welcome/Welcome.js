import React from 'react';
import './Welcome.css'

function Welcome() {
    return (
        <div className="welcomeContainer">
        <h1 className="welcome">I am a...</h1>
        <div className="leftcolumn">
            <div className="button" onClick={event => window.location.href='/login/student'}>Student</div>
        </div>
        <div className="rightcolumn">
            <div className="button" onClick={event => window.location.href='/login/professor'}>Professor</div>
        </div>
        </div>
    )
        
}

export default Welcome;