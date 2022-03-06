import React, {useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import InvalidPage from "../../../components/InvalidPage/InvalidPage";
import "./ListingDescriptionPage.scss"
import Hero from "../../../components/Hero/Hero";
import {Button, Stack, Tooltip, Typography} from "@mui/material";
import {
    FavoriteBorderOutlined,
    LocationOnOutlined,
    ShareOutlined
} from "@mui/icons-material";
import VerticalButton from "../../../components/VerticalButton/VerticalButton";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import CheckoutCard from "../../../components/CheckoutCard/CheckoutCard";

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
                    <div className={'listing-subheader border-bottom'}>
                        <div>
                            <Typography variant={'h6'}>
                                {titleCase(listing.listingType)} in a {titleCase(listing.type)} in {titleCase(listing.location.city)}
                            </Typography>
                            <Typography variant={'body2'} color={'dimgray'}>{listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} bath</Typography>
                        </div>
                        <div>
                            <ProfileCard user={{
                                name: 'John Doe',
                                avatar: 'https://picsum.photos/200/300',
                                username: 'johnd0e'
                            }}/>
                        </div>
                    </div>
                    <div id={'mobile-listing-nav'}>
                        <a href={`#amenities`}>
                            <Button variant={'outlined'} color={'primary'}>
                                TO-DO: Add react-scroll
                            </Button>
                        </a>
                    </div>
                    <div id={'description'} className={'listing-description border-bottom'}>
                        <Typography variant={'h6'}>Description</Typography>
                        <Typography variant={'body1'}>{listing.description}</Typography>
                    </div>
                    <div id={'amenities'} className={'listing-amenities border-bottom'}>
                        <Typography variant={'h6'}>Amenities</Typography>
                        <div className={'amenities-list'}>
                            {listing.amenities.map((amenity:string, index:number) => {
                                return <Typography key={index} variant={'body1'}>{amenity}</Typography>
                            })}
                        </div>
                    </div>
                    <div id={'reviews'} className={'listing-reviews border-bottom'}>
                        <Typography variant={'h6'}>Reviews</Typography>
                        <Typography variant={'body1'}>15 Reviews</Typography>
                    </div>
                </div>
                <Stack justifyContent={'center'} sx={{
                    width: '30%',
                    height: '100vh',
                    position: 'fixed',
                    zIndex: '1000',
                    top: '0',
                    left: '70%',
                    maxWidth: '400px',
                }}>
                    <CheckoutCard listing={listing}/>
                </Stack>
            </div>;
    }
}

export default ListingDescriptionPage;