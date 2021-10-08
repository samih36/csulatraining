import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './firebaseConfig';
import firebase from 'firebase';
import './App.css';
import Hello from './Hello.js';
import Welcome from './Welcome/Welcome.js'
import DevFeatureSelector from './DevFeatureSelector.js';


const database = firebase.database();

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = "/" component={Welcome} />
            <Route exact path="/dev" render={(props) => <DevFeatureSelector {...props} database={database} />} />
            <Route exact path="/hello" render={(props) => <Hello {...props} database={database} />} />
          </Switch>
        </Router>
      </div>
  );
}
}

export default App;