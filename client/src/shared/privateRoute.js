import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const auth = localStorage.getItem('token');
    return auth ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to='/signIn' />
    );
}

export default PrivateRoute;
