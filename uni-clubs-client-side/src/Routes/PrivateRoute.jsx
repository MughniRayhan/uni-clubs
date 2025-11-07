import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import Loader from '../Components/Loader';

function PrivateRoute({children}) {
    const {user,loading} = UseAuth();
    const location = useLocation()
    if(loading){
        return <Loader></Loader>
    }
if(user && user?.email){
    return children;
}
return <Navigate state={location.pathname}  to='/auth/login'></Navigate>
}


export default PrivateRoute