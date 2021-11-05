import React, { useState, useEffect } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { useParams } from 'react-router-dom'

export default function StudentCourseView(props) {
    let courseID = useParams().cid;

    const { currentUser } = useAuth();
    const database = props.database;
    const [modules, setModules] = useState(false);
    const [completion, setCompletion] = useState(false);
    const [professor, setProfessor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [passPercentage, setPassPercentage] = useState({});
    
    useEffect(() => {
        database.ref('courses').child(courseID).child('modules').once('value').then(snapshot => {
            if (snapshot.exists())
            {
                let mods = snapshot.val()
                setModules(mods);
            }
            else
            {
                console.log(`Course ${courseID} has no modules`);
            }
        });

        database.ref('users').child(currentUser.uid).once('value').then(snapshot => {
            let role = snapshot.val().role;
            setProfessor(role === 'professor');
        });

        database.ref('users').child(currentUser.uid).child('courses').child(courseID).on('value', snapshot => {
            // console.log(snapshot.val().modules);
            setCompletion(snapshot.val().modules);
        })

        database.ref('courses').child(courseID).child('modules').on('value', snapshot => {
            let quizzes = snapshot.val();
            for(let key in quizzes) {
                quizzes[key].type === 'quiz' ? passPercentage[key] = quizzes[key].passPercentage : passPercentage[key] = 1;
            }
        })
        setLoading(false)

                // database.ref('users').child(currentUser.uid).child('courses').child(courseID).child('modules').once('value').then(snapshot => {
                //     if (snapshot.exists())
                //         setCompletion(snapshot.val());
                // });
    }, []);


    // This needs to be migrated to a new ProfessorCourseView
    // Or this component can be generalized
    // Commenting it out because it wasn't functional yet anyway
    // Sorry if i messed anything up
    /*
    const handleModuleCreate = () => {
        database.ref("courses").child(courseID).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().professor == currentUser.uid) {
                    return (<div>Add a module</div>)
                }
            }
        })
    }
    */

    /*
    const getColor = completion => {
        let pct = parseInt(completion);
        if (pct == 100)
            return '#32a852';
        else if (pct > 0)
            return '#4B9CD3';
        else return '#C8C8C8';
    };
    */
    if (!loading) {
        return(
            <div>
                <h1>Modules</h1>
                {
                    Object.keys(modules).map(mid => {
                        return completion[mid] >= (passPercentage[mid] * 100) ? 
                            <div className='completedCourse' key={mid} onClick={event => window.location.href=`/course/${courseID}/${mid}`}>{modules[mid].name}</div> : 
                            <div className='course' key={mid} onClick={event => window.location.href=`/course/${courseID}/${mid}`}>{modules[mid].name}</div>
                    })
                }
    
                {/* {professor && <div>
                        <h4>Create New Module:</h4>
                        <button type = "button" onClick={event=>window.location.href=`/create-module/${courseID}`}>Reading</button>
                        <button type = "button" onClick={event=>window.location.href=`/create-quiz/${courseID}`}>Quiz</button>
                    </div>
                } */}
    
            </div>
        )
    } else {
        return <h1>Modules</h1>
    }
    
    }
    