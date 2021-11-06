import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import app from './firebaseConfig';
import firebase from 'firebase';
import './App.css';
import Hello from './Hello.js';
import Welcome from './Welcome/Welcome.js'
import Signup from './Signup.js';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Login.js';
import Header from './Header.js';
import PrivateRoute from './PrivateRoute.js';
import ForgotPassword from './ForgotPassword.js';
import MyCourses from './MyCourses/MyCourses.js';
import ProfessorCourses from './ProfessorCourses/ProfessorCourses';
import CourseDashboard from './ProfessorCourses/CourseDashboard';
import CreateCourse from './ProfessorCourses/CreateCourse';
import CreateModule from './ProfessorCourses/CreateModule';
import SelectCourse from './MyCourses/SelectCourse.js';
import Module from './Module.js'
import StudentCourseView from './StudentCourseView.js'
import QuizCreationForm from './Quiz/QuizCreationForm';

const database = app.database();

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
          <Route path={["/"]} render={ ( props ) => ( props.location.pathname !== "/" && props.location.pathname !== "/login" && props.location.pathname !== "/login/professor" && props.location.pathname !== "/login/student" && props.location.pathname !== "/signup/student" && props.location.pathname !== "signup/professor" ) && <Header database ={database} /> } />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path = "/signup/:role?" component={(props) => <Signup database={database} />} />
              <Route exact path = "/login/:role?" component={Login} />
              <Route exact path = "/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path ="/my-courses" component={(props) => <MyCourses database={database} />} database={database} role={'student'} />
              <PrivateRoute exact path ="/professor-courses" component={(props) => <ProfessorCourses database={database} />} database={database} role={'professor'} />
              <PrivateRoute exact path ="/course-admin/:cid" component={(props) => <CourseDashboard database={database} />} database={database} role={'professor'} />
              <PrivateRoute exact path ="/create-course" component={(props) => <CreateCourse database={database} />} database={database} role={'professor'} />
              <PrivateRoute exact path ="/create-module/:cid" component={(props) => <CreateModule database={database} />} database={database} role={'professor'} />
              <PrivateRoute exact path ="/create-quiz/:cid" component={(props) => <QuizCreationForm {...props} database={database} />} database={database} role={'professor'}/>
              {
                //<PrivateRoute exact path ="/course/:cid/quiz/:mid" component={(props) => <QuizComponent {...props} database={database} />} />
              }
              <PrivateRoute exact path ='/add-course' component={(props) => <SelectCourse database={database} /> } database={database} role={'student'} />
              <PrivateRoute exact path="/course/:cid" component={(props) => <StudentCourseView database={database}/>} database={database} role={'student'} />
              <PrivateRoute exact path="/course/:cid/:mid" component={(props) => <Module database={database}/>} database={database}  role={'student'}/>
              {/* hard coded class above for now, will change later*/}
              {/* <PrivateRoute exact path="/dev" component={(props) => <DevFeatureSelector {...props} database={database} />} /> */}
              <PrivateRoute exact path="/hello" component={(props) => <Hello {...props} database={database} />} database={database} role={'student'}/>
            </Switch>
          </Router>
        </AuthProvider>
       </div>
  );
}
}

export default App;
