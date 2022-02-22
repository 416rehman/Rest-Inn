import React from 'react';

import './HomePage.scss';
import HeroSection from "./sections/HeroSection/HeroSection";
import PropertyTypeSection from "./sections/PropertyTypeSection/PropertyTypeSection";
import BestSellerSection from "./sections/BestSellersSection/BestSellerSection";

function HomePage() {
    return (
        <div className={'home-page'}>
            <HeroSection/>
            <PropertyTypeSection/>
            <BestSellerSection/>
        </div>
    );
}

export default HomePage;