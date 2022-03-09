import React, {useEffect} from 'react';
import {SwiperSlide} from "swiper/react";
import CardSwiper from "../../../../components/CardSwiper/CardSwiper";
import "./BestSellersSection.scss"
import {Box, LinearProgress} from "@mui/material";
import {getBestSellingListings} from "../../../../services/listing.service";
import {Listing} from "../../../../@typings/listings";

function BestSellerSection() {
    const [bestSellers, setBestSellers] = React.useState<Listing[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);

        getBestSellingListings(10).then(setBestSellers)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={'best-sellers-section page-content full-width-mobile'}>
            {isLoading ?
                <React.Fragment>
                    <h2> Explore the best sellers </h2>
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                </React.Fragment>
                :
                bestSellers.length > 0 ?
                    <React.Fragment>
                        <h2> Explore the best sellers </h2>
                        <div className={'best-sellers-section__content'}>
                            {bestSellers.map((l: any) => {
                                return <SwiperSlide>
                                    <CardSwiper url={`/listings/${l.id}`} title={l.location.city + ', ' + l.location.province}
                                                baths={l.baths} beds={l.beds} price={`$${l.price}`}>
                                        {l.photos.map((i: any) => {
                                            return <img src={i} alt={l.title}/>
                                        })}
                                    </CardSwiper>
                                </SwiperSlide>
                            })}
                        </div>
                    </React.Fragment>
                     : null
            }
        </div>
    );
}

export default BestSellerSection;