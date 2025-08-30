import React from 'react';
import NavBar from '../Component/NavBar/NavBar';
import Footer from '../Component/Footer/Footer';
import { Outlet } from 'react-router';


const Roots = () => {
    return (
        <div>
             <NavBar />
             <Outlet />
             <Footer />
        </div>
    );
}; 

export default Roots;