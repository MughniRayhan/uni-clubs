import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Shared/NavBar/NavBar';
import Footer from '../Shared/Footer/Footer';
import ChatWidget from '../Components/AI/ChatWidget';


const RootLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <ChatWidget />
            <Footer />
        </div>
    );
};

export default RootLayout;