import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import { BrowserRouter as Router, useHistory } from "react-router-dom";
  import { useAuth } from './contexts/AuthContext';
  
                       
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
                       
  export default function Header() {
    const { header, logOutButton } = useStyles();
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    
    const history = useHistory();

    const handleLogout = async () =>  {
        setError('');
        try {
            await logout();
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }
                                        
    return (
      <header>
        <AppBar className={header}>
            <Toolbar>
                <Router>
                <Button className={logOutButton} onClick={event => window.location.href='/dev'} >
                        Home
                </Button>
                {currentUser && <Button className={logOutButton} onClick={event => window.location.href='/my-courses'} >
                        My Courses
                </Button>}
                {currentUser && <Button className={logOutButton} onClick={handleLogout} >
                        Log Out
                </Button>}
                </Router>
            </Toolbar>
        </AppBar>
      </header>
    );
  }