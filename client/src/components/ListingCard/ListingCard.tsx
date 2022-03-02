import React from 'react';
import './ListingCard.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Pagination} from "swiper";
import {CardActionArea, Rating, Tooltip} from "@mui/material";
import {titleCase} from '../../helpers/utils';
import {Link} from "react-router-dom";
import {BathroomOutlined, BedroomParentOutlined} from "@mui/icons-material";

interface IProps {
    listing: ListingPartial;
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
                                <b>{`${titleCase(listing.listingType)}`}</b>
                            </div>
                        </div>
                        <div className="listing-card-info-mid">
                            {`${listing.beds * 2} guests · ${listing.bedrooms} bedrooms · ${listing.amenities.join(' · ')}`}
                        </div>
                        <div className="listing-card-info-bottom">
                            <div className={"listing-card-info-data"}>
                                <div className={'listing-card-info-icons'}>
                                    {listing.beds ?
                                        <Tooltip title={'Number of Beds: ' + listing.beds}>
                                    <span>
                                        <BedroomParentOutlined/>
                                        {listing.beds}
                                    </span>
                                        </Tooltip> : null}

                                    {listing.baths ?
                                        <Tooltip title={'Number of Bathrooms: ' + listing.baths}>
                                    <span>
                                        <BathroomOutlined/>
                                        {listing.baths}
                                    </span>
                                        </Tooltip> : null}
                                </div>
                            </div>
                            <div className={"listing-card-info-price"}>${`${listing.price}`}</div>
                        </div>
                    </div>
                </CardActionArea>
            </Link>
        </div>
    );
}

export default ListingCard;