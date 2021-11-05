import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseTestConfig = {
    apiKey: "AIzaSyD6c3aRZlCGcrHTfi4ZmD1hLnu6ur1N238",
    authDomain: "csula--testing.firebaseapp.com",
    databaseURL: "https://csula--testing-default-rtdb.firebaseio.com",
    projectId: "csula--testing",
    storageBucket: "csula--testing.appspot.com",
    messagingSenderId: "479328359054",
    appId: "1:479328359054:web:8f62be867e300a73d4afdf"
};

const testing = firebase.initializeApp(firebaseTestConfig, "testing");

export const authTesting = testing.auth();

export default testing;