import React from 'react';
import './ListingCard.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Pagination} from "swiper";
import {CardActionArea, Rating, Tooltip} from "@mui/material";
import {titleCase} from '../../helpers/utils';
import {Link} from "react-router-dom";

interface Listing {
    title: string;
    rating: number;
    photos: string[];
    price: number;
    bedrooms: number;
    beds: number;
    amenities: string[];
    baths: number;
    listingType: string;
    _id: string;
}

interface IProps {
    listing: Listing;
    className?: string;
    [x: string]: any;
}

function ListingCard({listing, className, ...rest}: IProps) {
    return (
        <div className={'listing-card ' + (className || '')} {...rest}>
            <Link to={`/listings/${listing._id}`}>
                <CardActionArea>
                    <div className={'listing-card-images'}>
                        <Swiper
                            modules={[Pagination, A11y]}
                            a11y={{
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            }}
                            loop={true}
                            pagination={true}
                            className={'listing-card-swiper ' + (className || '')}>
                            {listing.photos.map((photo, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <img src={photo} alt="" loading={"lazy"}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className={'listing-card-groove'}>
                        <span>· · · · ·</span>
                    </div>
                    <div className="listing-card-info">
                        <div className="listing-card-info-top">
                            <p style={{fontWeight: 500}}>{listing.title}</p>
                            <div className="listing-card-info-rating">
                                <Tooltip title={'Rating: ' + listing.rating}>
                            <span>
                                <Rating name="read-only" value={listing.rating} precision={0.5} readOnly size={'small'}/>
                            </span>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="listing-card-info-mid">
                            {`${listing.beds * 2} guests · ${listing.bedrooms} bedrooms · ${listing.baths} baths`}
                            <div>{`${listing.amenities.join(', ')}`}</div>
                        </div>
                        <div className="listing-card-info-bottom">
                            <div>
                                {`One night in `}
                                <b>{`${titleCase(listing.listingType)}`}</b>
                            </div>
                            <div>${`${listing.price}`}</div>
                        </div>
                    </div>
                </CardActionArea>
            </Link>
        </div>
    );
}

export default ListingCard;