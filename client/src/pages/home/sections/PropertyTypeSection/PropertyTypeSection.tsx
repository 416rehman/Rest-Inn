import React from 'react';
import PortraitCard from "../../../../components/PortraitCard/PortraitCard";
import {Swiper, SwiperSlide} from "swiper/react";
import './PropertyTypeSection.scss'
import {titleCase} from "../../../../services/helper.service";
import {useSelector} from "react-redux";
import ErrorAPI from "../../../../components/Errors/ErrorAPI";
import {Stack, Typography} from "@mui/material";

function PropertyTypeSection() {
    const {types} = useSelector((state: any) => state.meta);

    return types.length > 0 ?
        <div className={'property-type-section full-width-mobile'} style={{
            backgroundColor: 'transparent'
        }}>
            <Stack bgcolor={'white'} sx={{
                margin: '1rem 1rem 0 1rem',
                padding: '1rem',
                borderRadius: '1rem 1rem 0 0',
            }}>
                <Typography variant={'h4'}>
                    Find spaces that suit your style
                </Typography>
            </Stack>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                style={{
                    backgroundColor: 'white'
                }}
            >
                {types.map((p: any, i: number) => {
                    return (<SwiperSlide key={p._id}>
                        <PortraitCard name={titleCase(p._id)} key={i} url={'/listings?type=' + p._id}
                                      image={'https://www.concertproperties.com/legacy/sites/default/files/imagecache/rental-gallery/14-78.JPG'}/>
                    </SwiperSlide>)
                })}

            </Swiper>
        </div>
     : <ErrorAPI/>
}

export default PropertyTypeSection;