import React from 'react';
import Hero from "../../../../components/Hero/Hero";
import './HeroSection.scss';
import {Chip, Fab, Rating, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {MapsHomeWorkOutlined} from "@mui/icons-material";

interface Slide {
    image: string;
    location: string;
    description: string;
    min_price: number;
    num_of_listings: number;
    top_sellers?: Listing[];
}

const slides: Slide[] = [
    {
        image: 'https://cdn.pixabay.com/photo/2016/04/01/00/08/toronto-1298016_1280.jpg',
        description: "Uncover the hidden gems in a city that never sleeps. Toronto is a dynamic, creative, and globally connected city. With more than 100 million people, Toronto is the most populous city in Canada, and the most visited city in the world.",
        location: "Toronto",
        min_price: 329.99,
        num_of_listings: 1450,
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/08/30/11/48/santa-monica-pier-1630451_1280.jpg',
        description: "Relax in the beach or explore the city. Santa Monica Pier is a popular beach destination in Los Angeles, California. It is located in the Santa Monica Mountains, and is a popular destination for vacationers.",
        location: "Los Angeles",
        min_price: 249.99,
        num_of_listings: 1350,
    },
    {
        location: "New York",
        image: 'https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        description: "Named the city of lights, New York is a major center for art, fashion, architecture, and culture. The city is also known for its museums, nightlife, fashion, and architecture.",
        min_price: 399.99,
        num_of_listings: 1520,
    }
]

function HeroSection() {
    return (
        <div className={'hero-section'}>
            <Hero>
                {slides.map((slide, index) => (
                    <div key={index} className={'location-slide'}>
                        <div className={'slide-background'}>
                            <img src={slide.image} alt=""/>
                            <div className='dark-overlay'/>
                        </div>
                        <div className="location-slide-content">
                            <div className={'location-slide-title'}>
                                <h1>{slide.location}</h1>
                            </div>
                            <div className={'location-data-container'}>
                                <div className={'location-stats-container'}>
                                    <div className="slide-location-stats">
                                        <Chip variant={'outlined'} label={`${slide.num_of_listings - (slide.num_of_listings % 100)}+ Listings`} size={'small'}  />
                                        <span> </span>
                                        <Chip variant={'outlined'} label={`Starting From $${slide.min_price}`} size={'small'} />
                                    </div>
                                    <Link to={'/listings?location=' + slide.location}>
                                        <Fab variant="extended">
                                            <MapsHomeWorkOutlined sx={{ mr: 1 }} />
                                            Browse Now
                                        </Fab>
                                    </Link>
                                </div>
                                <div className={'slide-location-description'}>
                                    <Tooltip title={'Average Rating'}>
                                    <span>
                                        <Rating name="read-only" value={4} readOnly />
                                    </span>
                                    </Tooltip>
                                    <p>{slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Hero>
        </div>
    );
}

export default HeroSection;