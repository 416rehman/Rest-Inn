import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ErrorGeneric from "../../../components/Errors/ErrorGeneric";
import "./ListingDescriptionPage.scss"
import Hero from "../../../components/Hero/Hero";
import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {
    DeleteForeverRounded,
    EditOutlined,
    FavoriteBorderOutlined,
    LocationOnOutlined,
    ShareOutlined
} from "@mui/icons-material";
import VerticalButton from "../../../components/VerticalButton/VerticalButton";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import CheckoutCard from "../../../components/CheckoutCard/CheckoutCard";
import {Listing} from "../../../@typings/listings";
import {titleCase} from "../../../services/helper.service";
import {deleteListing, getListingById} from "../../../services/listing.service";
import {useSelector} from "react-redux";
import Alert from "../../../components/Alert/Alert";

function ListingDescriptionPage() {
    const navigate = useNavigate();
    const {listingId} = useParams();
    const {user} = useSelector((state: any) => state.auth);

    const [listing, setListing] = React.useState<Listing | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [WIPDialogOpen, setWIPDialogOpen] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        getListingById(listingId || "").then(data => {
            setListing(data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [listingId]);

    if (loading) {
        return <CircularProgress/>;
    } else {
        return !listing ? <ErrorGeneric className={'page-content'}/> :
            <Stack padding={'1rem'} textTransform={'capitalize'}>
                <Grid container flexWrap={'wrap'} sx={{
                    flexDirection: {
                        sm: 'column',
                        md: 'row'
                    },
                }}>
                    <Grid item xs={12} md={user?._id == listing.host?._id ? 12 : 8}>
                        <Stack gap={'2rem'}>
                            <Stack width={'100%'} gap={'1rem'}>
                                <Stack direction={'row'} gap={'1rem'} justifyContent={'space-between'}
                                       alignItems={'center'}>
                                    <Stack>
                                        <Typography variant={'h5'}
                                                    fontWeight={'medium'}>{titleCase(listing.title || '')}</Typography>
                                        <Tooltip title={'Approximate Location'}>
                                            <Button sx={{
                                                justifyContent: 'flex-start',
                                            }}><LocationOnOutlined/>{listing.location?.city}, {listing.location?.province}
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                    <Alert open={WIPDialogOpen} setOpen={setWIPDialogOpen} message={
                                        'This feature is currently under development. We are working hard to make it available soon.'
                                    }/>
                                    <Stack direction={'row'} gap={'1rem'}>
                                        <VerticalButton icon={<ShareOutlined color={'disabled'}/>}
                                                        onClick={() => {
                                                            setWIPDialogOpen(true)
                                                        }}
                                                        label={'Share'}
                                        />
                                        {user?._id == listing.host?.id ?
                                            <><VerticalButton icon={<EditOutlined color={'disabled'}/>} label={'Edit'}
                                                              onClick={() => {
                                                                  navigate("edit", {state: {listingId: listing._id}})
                                                              }}
                                                              outlined/>
                                                <VerticalButton icon={<DeleteForeverRounded color={'error'}/>}
                                                                label={'Delete'}
                                                                color={'red'}
                                                                sx={{
                                                                    borderColor: '#ef9898',
                                                                    color: '#e16060',

                                                                }}
                                                                onClick={() => {
                                                                    setDeleteDialogOpen(true)
                                                                }}
                                                                outlined/>
                                                <Alert title={'Delete Listing'}
                                                       message={'Are you sure you want to delete this listing?'}
                                                       variant={'error'}
                                                       setOpen={setDeleteDialogOpen} open={deleteDialogOpen}
                                                       onConfirm={() => {
                                                           if (listing?._id) {
                                                               deleteListing(listing?._id).then(() => {
                                                                   navigate("/", {state: {listingId: listing._id}})
                                                               }).catch(err => {
                                                                   console.log(err);
                                                               })
                                                           }
                                                       }
                                                       } confirmText={'Delete'}/>
                                            </>
                                            : <VerticalButton icon={<FavoriteBorderOutlined color={'disabled'}/>}
                                                              label={'Save'}
                                                              onClick={() => {
                                                                  setWIPDialogOpen(true)
                                                              }}
                                                              outlined
                                            />}
                                    </Stack>
                                </Stack>
                                <Stack height={'60vh'} sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    '& img': {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }
                                }}>
                                    <Hero className={'listing-gallery-swiper'}>
                                        {listing.photos?.map((photo: string, index: number) => {
                                            return <img key={index} src={photo}
                                                        alt={`${listing.title} Photo ${index + 1}`}/>
                                        })}
                                    </Hero>
                                </Stack>
                                <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'}>
                                    <Stack>
                                        <Typography variant={'h6'}>
                                            {titleCase(listing.listingType || '')} in
                                            a {titleCase(listing.type || '')} in {titleCase(listing.location?.city || '')}
                                        </Typography>
                                        <Typography variant={'body2'} color={'dimgray'}>{listing.guests} guests
                                            · {listing.bedrooms} bedrooms · {listing.beds} beds
                                            · {listing.baths} bath</Typography>
                                    </Stack>
                                    <Stack>
                                        {listing.host && listing.host.id &&
                                            <ProfileCard username={listing.host.username}
                                                         name={listing.host.firstName + ' ' + listing.host.lastName}/>}

                                    </Stack>
                                </Stack>
                            </Stack>

                            <Stack id={'description'} gap={'1rem'}>
                                <Divider/>
                                <Typography variant={'h6'}>Description</Typography>
                                <Typography variant={'body1'}>{listing.description}</Typography>
                            </Stack>

                            <Stack id={'amenities'} gap={'1rem'}>
                                <Divider/>
                                <Typography variant={'h6'}>Amenities</Typography>
                                <Stack textTransform={'capitalize'} className={'amenities-list'}>
                                    {listing.amenities?.map((amenity: string, index: number) => {
                                        return <Typography key={index} variant={'body1'}>{amenity}</Typography>
                                    })}
                                </Stack>
                            </Stack>
                            {/*TODO: Reviews */}
                            {/*<Stack id={'reviews'} gap={'1rem'}>*/}
                            {/*    <Divider/>*/}
                            {/*    <Typography variant={'h6'}>Reviews</Typography>*/}
                            {/*    <Typography variant={'body1'}>15 Reviews</Typography>*/}
                            {/*</Stack>*/}
                            <Divider/>
                        </Stack>
                    </Grid>
                    {user?._id == listing.host ? null :
                        <Grid item xs={12} md={4}>
                            <Stack justifyContent={'center'} sx={{
                                height: '100%',
                                position: {
                                    md: 'sticky',
                                    xs: 'initial',
                                },
                                zIndex: '1000',
                                top: '0',
                                left: '70%',
                                maxWidth: {
                                    md: '400px',
                                    xs: '100%',
                                },
                            }}>
                                <CheckoutCard listing={listing}/>
                            </Stack>
                        </Grid>}
                </Grid>
            </Stack>;

    }
}

export default ListingDescriptionPage;