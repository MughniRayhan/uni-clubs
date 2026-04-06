import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../FireBase/FireBase.config'
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Send verification email
        await sendEmailVerification(result.user);

        // Immediately logout so user cannot use unverified account
        await signOut(auth);

        setLoading(false);
        return result;
    };

    const signIn = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        await result.user.reload();
        if (!result.user.emailVerified) {
            await signOut(auth);
            setUser(null);
            setLoading(false);
            throw new Error("Please verify your email first.");
        }
        setUser(result.user);
        setLoading(false);
        return result;
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const forgetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.emailVerified) {
                setUser(currentUser);
            } else {
                setUser(null); // block unverified
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
        updateUserProfile,
        forgetPassword
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider