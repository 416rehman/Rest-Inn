import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import './CardSwiper.scss'
import {A11y, Pagination} from "swiper";
import {BathroomOutlined, BedroomParentOutlined} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {titleCase} from "../../services/helper.service";

interface IProps {
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
    title: string;
    price?: string;
    beds?: number;
    baths?: number;
    url: string;

    [x: string]: any;
}

function CardSwiper({children, className, title, price, beds, baths, url, ...rest}: IProps) {
    return (
        <div className={'card-swiper ' + className || ''}>
            <Link to={url}>
                <Swiper
                    modules={[Pagination, A11y]}
                    a11y={{
                        prevSlideMessage: 'Previous slide',
                        nextSlideMessage: 'Next slide',
                    }}
                    loop={true}
                    pagination={true}
                    {...rest}
                >
                    {Array.isArray(children) ? children.map((child, index) => (
                        <SwiperSlide key={index}>
                            {child}
                        </SwiperSlide>
                    )) : <SwiperSlide>{children}</SwiperSlide>}
                </Swiper>
                <div className={'portrait-swiper-info'}>
                    <h1> {titleCase(title)} </h1>
                    <div>
                        <div className={'info-details'}>

                            {beds ?
                                <Tooltip title={'Number of Beds'}>
                                    <span>
                                        <BedroomParentOutlined/>
                                        {beds}
                                    </span>
                                </Tooltip> : null}

                            {baths ?
                                <Tooltip title={'Number of Bathrooms'}>
                                    <span>
                                        <BathroomOutlined/>
                                        {baths}
                                    </span>
                                </Tooltip> : null}

                        </div>
                        {price ? <h1 className={'price'}>{price}</h1> : null}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CardSwiper;