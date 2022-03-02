import React, {useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import InvalidPage from "../../../components/InvalidPage/InvalidPage";
import "./ListingDescriptionPage.scss"
import Hero from "../../../components/Hero/Hero";
import {Button, Tooltip, Typography} from "@mui/material";
import {
    FavoriteBorderOutlined,
    LocationOnOutlined,
    ShareOutlined
} from "@mui/icons-material";
import VerticalButton from "../../../components/VerticalButton/VerticalButton";

function ListingDescriptionPage() {
    const {listingId} = useParams();

    const [listing, setListing] = React.useState<Listing | null>(null);
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        axios.get(apiURL(`/properties/${listingId}`)).then(res => {
            setListing(res.data.data);
            console.log(listing)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [listingId]);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return !listing ? <InvalidPage className={'page-content'}/> :
            <div className={'page-content listing-description-page'}>
                <div className={'listing-main'}>
                    <div className={'listing-header'}>
                        <div className={'header-text'}>
                            <Typography variant={'h5'} fontWeight={'medium'}>{titleCase(listing.title)}</Typography>
                            <Tooltip title={'Approximate Location'}>
                                <Button sx={{
                                    justifyContent: 'flex-start',
                                }}><LocationOnOutlined/>{listing.location.city}, {listing.location.province}</Button>
                            </Tooltip>
                        </div>
                        <div className={'header-buttons'}>
                            <VerticalButton icon={<ShareOutlined color={'disabled'}/>} label={'Share'}/>
                            <VerticalButton icon={<FavoriteBorderOutlined color={'disabled'}/>} label={'Save'} outlined/>
                        </div>
                    </div>
                    <Hero className={'listing-gallery-swiper'}>
                        {listing.photos.map((photo:string, index:number) => {
                            return <img key={index} src={photo} alt={`${listing.title} Photo ${index + 1}`}/>
                        })}
                    </Hero>
                    <div className={'border-bottom'}>
                        <Typography variant={'h6'}>
                            {titleCase(listing.listingType)} in a {titleCase(listing.type)} in {titleCase(listing.location.city)}
                        </Typography>
                        <Typography variant={'body2'} color={'dimgray'}>6 guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} bath</Typography>
                    </div>
                    <div className={'listing-description border-bottom'}>
                        <Typography variant={'h6'}>Description</Typography>
                        <Typography variant={'body1'}>{listing.description}</Typography>
                    </div>
                    <div className={'listing-reviews border-bottom'}>
                        <Typography variant={'h6'}>Reviews</Typography>
                        <Typography variant={'body1'}>15 Reviews</Typography>
                    </div>
                </div>
                <div className={'listing-checkout-card'}>
                    <h1>CHECKOUT CARD</h1>
                </div>
            </div>;
    }
}

export default ListingDescriptionPage;