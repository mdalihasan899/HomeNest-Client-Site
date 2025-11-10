import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import Loadding from '../Components/Loadding/Loadding';

const PrivetRoutes = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadding, setLoading] = useState(true);
    const location = useLocation();
    console.log(location);

    // track user login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    if (loadding) {
        return <Loadding></Loadding>
    }
    if (!user) {
        return <Navigate state={location?.pathname} to={'/login'}></Navigate>
    }
    return children;
};

export default PrivetRoutes;