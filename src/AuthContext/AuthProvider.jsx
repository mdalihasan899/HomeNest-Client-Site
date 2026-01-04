import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadding, setLoadding] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoadding(false);
        });
        return () => unsubscribe();
    }, []);

    const updateUserProfile = async (name, photoURL) => {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL,
        });
        setUser({ ...auth.currentUser });
    };

    const authInfo = {
        user,
        loadding,
        updateUserProfile,
    }

    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;