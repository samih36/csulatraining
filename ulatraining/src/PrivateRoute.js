import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import './App.css'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
        rest.database.ref('users').child(currentUser.uid).once('value').then(snapshot => {
            let userRole = snapshot.val().role;
            if (rest.role === userRole || userRole === 'admin') {
              setAuthorized(true)
            }
            setLoading(false)
        });
    } else {
      setLoading(false);
    }
  }, []);


  if (!currentUser) {
    return (
      <Redirect to="/login" />
    );
  } else if (loading) {
    return null;
  } else {
    return (
      <Route
        {...rest}
        render={props => {
          return authorized ? <Component {...props} /> : <h2 className="notAuthorized">sorry, you are not authorized to visit this page</h2>
        }}
      ></Route>
    )
  }
}