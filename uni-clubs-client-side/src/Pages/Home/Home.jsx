import React from 'react';
import Banner from './Banner/Banner';
import About from './AboutSection/About';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import Gallery from './Gallery/Gallery';
import CallToAction from './CallToAction/CallToAction';


const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <BenefitsSection/>
            <Gallery/>
            <CallToAction/>
        </div>
    );
};

export default Home;