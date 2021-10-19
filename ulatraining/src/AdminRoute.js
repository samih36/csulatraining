import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }, props) {
  const { currentUser } = useAuth();
  const database = props.database;
  let role = 'student';

  useEffect(() => {
    if (currentUser) {
        database.ref('users').child(currentUser.uid).once('value').then(snapshot => {
            let role = snapshot.val().role;
            console.log(role);
        });
    }

  });

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}