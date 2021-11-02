import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
} from "@material-ui/core";
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {useAuth} from './contexts/AuthContext';


const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: '#4B9CD3',
        position: 'sticky',
        marginBottom: '10px',
    },
    logOutButton: {
        float: 'right',
        fontSize: '18px',
        marginRight: '25px',
        fontFamily: 'Andale Mono, AndaleMono, monospace',
    }
}));

export default function Header(props) {
    const {header, logOutButton} = useStyles();
    const [erro, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState(false);
    const {currentUser, logout} = useAuth();
    const database = props.database;
    const history = useHistory();

    useEffect(() => {
        database.ref('users').child(currentUser.uid).once('value').then(snapshot => {
            if (snapshot.exists()) {
                let role = snapshot.val().role;
                setProfessor(role == 'professor');
            }
        });
        setLoading(false);
    }, [])

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push('/')
        } catch {
            setError('Failed to log out')
        }
    }
    if (professor) {
        return (
            <header>
                <AppBar className={header}>
                    <Toolbar>
                        <Router>
                            {currentUser &&
                            <Button className={logOutButton} onClick={event => window.location.href = '/professor-courses'}>
                                My Courses
                            </Button>}
                            {currentUser && <Button className={logOutButton} onClick={handleLogout}>
                                Log Out
                            </Button>}
                        </Router>
                    </Toolbar>
                </AppBar>
            </header>
        )
    } else {
        return (
            <header>
                <AppBar className={header}>
                    <Toolbar>
                        <Router>
                            {currentUser &&
                            <Button className={logOutButton} onClick={event => window.location.href = '/my-courses'}>
                                My Courses
                            </Button>}
                            {currentUser && <Button className={logOutButton} onClick={handleLogout}>
                                Log Out
                            </Button>}
                        </Router>
                    </Toolbar>
                </AppBar>
            </header>
        )
    }

}

