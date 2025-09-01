import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Shared/NavBar/NavBar';
import Footer from '../Shared/Footer/Footer';


const RootLayout = () => {
    return (
        <div>
             <NavBar />
             <Outlet />
             <Footer />
        </div>
    );
}; 

export default RootLayout;