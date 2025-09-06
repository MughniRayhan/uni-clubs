import React from 'react';
import Banner from './Banner/Banner';

import About from './AboutSection/About';
import BenefitsSection from './BenefitsSection/BenefitsSection';


const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <BenefitsSection/>
        </div>
    );
};

export default Home;