import React from 'react';
import PortraitCard from "../../../../components/PortraitCard/PortraitCard";
import {Swiper, SwiperSlide} from "swiper/react";
import './PropertyTypeSection.scss'
import {titleCase} from "../../../../services/helper.service";
import {useSelector} from "react-redux";
import ErrorAPI from "../../../../components/Errors/ErrorAPI";

function PropertyTypeSection() {
    const {types} = useSelector((state: any) => state.meta);

    return types.length > 0 ?
        <div className={'property-type-section page-content full-width-mobile'}>
            <h2>Find spaces that suit your style</h2>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
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