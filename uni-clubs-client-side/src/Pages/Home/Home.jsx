import React from 'react';
import Banner from './Banner/Banner';
import About from './AboutSection/About';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import Gallery from './Gallery/Gallery';
import CallToAction from './CallToAction/CallToAction';
import Stats from './StatsSection/Stats';
import Poll from './Polls/Poll';
import HomeAbout from './AboutSection/HomeAbout';


const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeAbout/>
            <BenefitsSection/>
            <Gallery/>
            <CallToAction/>
            <Poll/>
            <Stats/>
        </div>
    );
};

export default Home;