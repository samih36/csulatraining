import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDze6q3kn_XqEidQUjtGa2ZEZDz9p9b2zw",
  authDomain: "csula-8296c.firebaseapp.com",
  databaseURL: "https://csula-8296c-default-rtdb.firebaseio.com/",
  projectId: "csula-8296c",
  storageBucket: "csula-8296c.appspot.com",
  messagingSenderId: "67983772852",
  appId: "1:67983772852:web:13d8f7eb0fc3b216a01be1",
  measurementId: "G-EEHGS1VTBE"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export default app;