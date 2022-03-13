import React from 'react';

import './HomePage.scss';
import HeroSection from "./sections/HeroSection/HeroSection";
import PropertyTypeSection from "./sections/PropertyTypeSection/PropertyTypeSection";
import BestSellerSection from "./sections/BestSellersSection/BestSellerSection";
import {Stack} from "@mui/material";

function HomePage() {
    return (
        <Stack className={'home-page'} gap={'1rem'}>
            <HeroSection/>
            <PropertyTypeSection/>
            <BestSellerSection/>
        </Stack>
    );
}

export default HomePage;