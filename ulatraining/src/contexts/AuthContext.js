import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, firstName, lastName, onyen, role, database) {
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            if (userCredential.user.uid) {
                database.ref('users').child(userCredential.user.uid).set({firstName: firstName, lastName: lastName, onyen: onyen, role: role});
            }
            }).catch((error) => {
            console.log("error");
        });
        return;
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    } 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        signup, 
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}