import React from 'react';
import './ListingCard.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Pagination} from "swiper";
import {CardActionArea, Rating, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {BathroomOutlined, BedroomParentOutlined} from "@mui/icons-material";
import {ListingPartial} from "../../@typings/listings";
import {titleCase} from "../../services/helper.service";

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
                                <Tooltip title={'Rating: ' + listing.rating.average}>
                                    <Stack direction={"row"} color={"darkgrey"}>
                                        <Rating name="read-only" value={listing.rating.average} precision={0.5} readOnly size={'small'}/> / {listing.rating.count}
                                    </Stack>
                                </Tooltip>
                                <b>{`${titleCase(listing.listingType)}`}</b>
                            </div>
                        </div>
                        <div className="listing-card-info-mid">
                            {`${listing.guests} guests · ${listing.bedrooms} bedrooms · ${listing.amenities.join(' · ')}`}
                        </div>
                        <div className="listing-card-info-bottom">
                            <div className={"listing-card-info-data"}>
                                <div className={'listing-card-info-icons'}>
                                    {listing.beds ?
                                        <Tooltip title={'Beds: ' + listing.beds}>
                                            <Stack direction={"row"} alignItems={'center'}>
                                                <BedroomParentOutlined/>
                                                {listing.beds}
                                            </Stack>
                                        </Tooltip> : null}

                                    {listing.baths ?
                                        <Tooltip title={'Bathrooms: ' + listing.baths}>
                                            <Stack direction={"row"} alignItems={'center'}>
                                                <BathroomOutlined/>
                                                {listing.baths}
                                            </Stack>
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