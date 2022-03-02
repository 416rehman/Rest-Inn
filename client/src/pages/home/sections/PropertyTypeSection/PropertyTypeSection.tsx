import React, {useEffect} from 'react';
import axios from 'axios';
import PortraitCard from "../../../../components/PortraitCard/PortraitCard";
import {Swiper, SwiperSlide} from "swiper/react";
import './PropertyTypeSection.scss'
import {Box, LinearProgress} from "@mui/material";

function PropertyTypeSection() {
    const [propertyTypes, setPropertyTypes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        axios.get(apiURL('/properties/types'))
            .then(res => {
                setPropertyTypes(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    return isLoading ?
            <React.Fragment>
                <h2>Find spaces that suit your style</h2>
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            </React.Fragment>
                :
            propertyTypes.length > 0 ?
                <div className={'property-type-section page-content full-width-mobile'}>
                    <h2>Find spaces that suit your style</h2>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={30}
                    >
                        {propertyTypes.map((p: any, i) => {
                            return (<SwiperSlide>
                                <PortraitCard name={titleCase(p._id)} key={i} url={'/listings?type=' + p._id}
                                              image={'https://www.concertproperties.com/legacy/sites/default/files/imagecache/rental-gallery/14-78.JPG'}/>
                            </SwiperSlide>)
                        })}

                    </Swiper>
                </div> :
                null
}

export default PropertyTypeSection;