import React from 'react';
import LogoImg from "../../assets/logo.png";

const Logo = () => {
    return (
        <div >
           <img src={LogoImg} alt="logo" className=' h-12 '/>   
        </div>
    );
};

export default Logo;