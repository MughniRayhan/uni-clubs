import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile  } from 'firebase/auth';
import { auth } from '../FireBase/FireBase.config'
const provider = new GoogleAuthProvider();


function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,pasword) =>{
        setLoading(true);
     return createUserWithEmailAndPassword(auth, email, pasword)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const updateUserProfile = profileInfo =>{
        return updateProfile(auth.currentUser,profileInfo)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
});
return ()=>{
    unsubscribe();
}
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
        updateUserProfile
    }

  return (
    <AuthContext value={authInfo}>
       {children}
    </AuthContext>
  )
}

export default AuthProvider