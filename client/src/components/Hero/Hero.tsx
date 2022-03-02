/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-16
 */

import React from 'react';
// import Swiper core and required modules
import {Pagination, A11y, Autoplay, Parallax} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './Hero.scss'

interface IProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    height?: string;
    loop?: boolean;
    [x:string]: any;
}

export default ({children, className, style, height, loop, ...rest}: IProps) => {
    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay, Parallax]}
            a11y={{
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            }}
            parallax={true}
            loop={loop}
            pagination={true}
            className={'hero-swiper ' + (className || '')}
            {...rest}
        >
            {Array.isArray(children) ? children.map((child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            )) : (
                <SwiperSlide>
                    {children}
                </SwiperSlide>
            )}
        </Swiper>
    );
};