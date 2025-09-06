import React from 'react';
import Banner from './Banner/Banner';
import About from './AboutSection/About';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import Gallery from './Gallery/Gallery';


const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <BenefitsSection/>
            <Gallery/>
        </div>
    );
};

export default Home;