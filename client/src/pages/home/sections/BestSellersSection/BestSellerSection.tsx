import React, {useEffect} from 'react';
import {SwiperSlide} from "swiper/react";
import CardSwiper from "../../../../components/CardSwiper/CardSwiper";
import "./BestSellersSection.scss"
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
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
        <Stack className={'best-sellers-section page-content full-width-mobile'} gap={'1rem'}>
            <Typography variant={'h4'}>Explore the best sellers </Typography>
            <Box sx={{width: '100%'}}>
                {isLoading ? <LinearProgress/> :
                    bestSellers.length > 0 ?
                        <div className={'best-sellers-section__content'}>
                            {bestSellers.map((l: any) => {
                                return <SwiperSlide key={l.id}>
                                    <CardSwiper url={`/listings/${l.id}`}
                                                title={l.location.city + ', ' + l.location.province}
                                                baths={l.baths} beds={l.beds} price={`$${l.price}`}>
                                        {l.photos.map((i: any) => {
                                            return <img src={i} key={i} alt={l.title}/>
                                        })}
                                    </CardSwiper>
                                </SwiperSlide>
                            })}
                        </div>
                        : null}
            </Box>
        </Stack>
    );
}

export default BestSellerSection;