import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './firebaseConfig';
import firebase from 'firebase';
import './App.css';
import Hello from './Hello.js';
import Welcome from './Welcome/Welcome.js'
import DevFeatureSelector from './DevFeatureSelector.js';
import Signup from './Signup.js';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Login.js';
import Header from './Header.js';
import PrivateRoute from './PrivateRoute.js';
import ForgotPassword from './ForgotPassword.js';


const database = firebase.database();

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Header />
          <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path = "/signup" component={Signup} />
              <Route exact path = "/login" component={Login} />
              <Route exact path = "/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/dev" component={(props) => <DevFeatureSelector {...props} database={database} />} />
              <PrivateRoute exact path="/hello" component={(props) => <Hello {...props} database={database} />} />
            </Switch>
          </Router>
        </AuthProvider>
       </div>
  );
}
}

export default App;