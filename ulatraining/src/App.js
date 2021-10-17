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
import MyCourses from './MyCourses/MyCourses.js';

import ProfessorCourses from './ProfessorCourses/ProfessorCourses';
import CreateCourse from './ProfessorCourses/CreateCourse';

import ReadingModule from './ReadingModule.js';
import SelectCourse from './MyCourses/SelectCourse.js';
import ModuleSelector from './ModuleSelector.js';


const database = firebase.database();

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
          <Route path="/" render={ ( props ) => ( props.location.pathname !== "/") && <Header /> } />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path = "/signup/:role?" component={(props) => <Signup database={database} />} />
              <Route exact path = "/login/:role?" component={Login} />
              <Route exact path = "/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path ="/my-courses" component={(props) => <MyCourses database={database} />} />
              <PrivateRoute exact path ="/professor-courses" component={(props) => <ProfessorCourses database={database} />} />
              <PrivateRoute exact path ="/create-course" component={(props) => <CreateCourse database={database} />} />
              <PrivateRoute exact path ='/add-course' component={(props) => <SelectCourse database={database} /> } />
              <PrivateRoute exact path="/course/:cid" component={(props) => <ModuleSelector database={database}/>} />
              {/* hard coded class above for now, will change later*/}
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
