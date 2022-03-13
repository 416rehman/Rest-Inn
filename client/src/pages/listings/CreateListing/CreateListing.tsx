import React, {useEffect} from 'react';
import {EmptyListing, ListingFormData} from "../../../@typings/listings";
import {Stack} from "@mui/material";
import StepperStyled from "../../../components/StepperStyled";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step4 from "./Steps/Step4";
import Step3 from './Steps/Step3';
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from './Steps/Step8';
import {apiURL, securedPOST, securedPUT} from "../../../services/helper.service";
import {NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {getListingById} from "../../../services/listing.service";
import {validateTokenAndGetInfo} from "../../../services/user.service";
import Notification from "../../../components/NotificationSnackBar/Notification";

const userInfo = validateTokenAndGetInfo();

// Creates a new listing, and if photos are selected, uploads them to the server after creating the listing
function createListing(setNextLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, listingData: ListingFormData, setNotificationMessage: (value: (((prevState: string) => string) | string)) => void, setListingData: (value: (((prevState: ListingFormData) => ListingFormData) | ListingFormData)) => void, navigate: NavigateFunction) {
    setNextLoading(true);
    securedPOST(apiURL('/properties'), listingData).then(res => {
        const newListingId = res.data.data._id;
        if (newListingId && listingData?.photosToAdd) {
            setNotificationMessage('Uploading photos...');
            let fileData = new FormData();
            listingData.photosToAdd.forEach((file: File) => {
                fileData.append('files', file);
            });
            setListingData({...listingData, photosToAdd: []});
            securedPUT(apiURL(`/properties/${newListingId}`), fileData, false, {
                "content-type": "multipart/form-data"
            }).then(() => {
                localStorage.removeItem('lastListing')
                navigate(`/listings/${newListingId}`);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setNextLoading(false);
            })
        }
    }).catch(err => {
        setNotificationMessage(err.response.data.message || 'Something went wrong');
        console.log(err)
    })
}

// Updates an existing listing, and if photos are selected, uploads them to the server before updating the listing
function updateListing(listingData: ListingFormData, setNotificationMessage: (value: (((prevState: string) => string) | string)) => void, setListingData: (value: (((prevState: ListingFormData) => ListingFormData) | ListingFormData)) => void, setNextLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, listingId: string, navigate: NavigateFunction) {
    if (listingData?.photosToAdd) {
        setNotificationMessage('Uploading photos...');
        let fileData = new FormData();
        listingData.photosToAdd.forEach((file: File) => {
            fileData.append('files', file);
        });
        setListingData({...listingData, photosToAdd: []});
        setNextLoading(true);
        securedPUT(apiURL(`/properties/${listingId}`), fileData, false, {
            "content-type": "multipart/form-data"
        }).then(() => {
            navigate(`/listings/${listingId}`);
        }).catch(err => {
            setNotificationMessage(err.response.data.message || 'Something went wrong');
            console.log(err);
        }).finally(() => {
            setNextLoading(false);
        })
    }

    delete listingData.location?._id;

    securedPUT(apiURL(`/properties/${listingId}`), listingData).then(res => {
        console.log(res)
    }).catch(err => {
        setNotificationMessage(err.response.data.message || 'Something went wrong');
    })
}

function CreateListing() {
    const location: any = useLocation();
    const navigate = useNavigate();
    const {listingId} = useParams();
    const [listingData, setListingData] = React.useState<ListingFormData>(EmptyListing);
    const [nextLoading, setNextLoading] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');

    useEffect(() => {
        const locationState = location.state;

        if (locationState?.listing) {
            setNotificationMessage('Restored last unsaved listing');
            return setListingData(Object.assign(EmptyListing, JSON.parse(location.state.listing)));
        }

        const id = listingId || locationState?.listingId; //support url params and state
        if (id) {
            getListingById(id).then(data => {
                if (userInfo && userInfo.id == data.host) {
                    setNotificationMessage('Editing listing');
                    return setListingData({...listingData, ...data});
                }

            }).catch(err => {
                console.log(err);
                navigate('/listings');
            })

        }
    }, [location, listingId, navigate]);

    const handleChange = (name: any, value: any) => {
        if (name) {
            setListingData({...listingData, [name]: value})
        }
    };

    const handleLocationChange = (name: any, value: any) => {
        if (name) {
            const newLocation = {
                ...listingData.location,
                [name]: value
            }
            const newListingData = {
                ...listingData,
                location: newLocation
            }
            listingData.location = newLocation;
            setListingData({...newListingData})
        }
    };

    const handleArrayChange = (name: any, shouldAdd: any) => {
        if (name) {
            // Add amenity
            if (shouldAdd) {
                if (listingData.amenities) { // If amenities exist
                    setListingData({...listingData, amenities: [...listingData.amenities, name]})
                } else {    // If amenities do not exist
                    setListingData({...listingData, amenities: [name]})
                }
            } else if (listingData.amenities) { //Remove amenity
                setListingData({
                    ...listingData,
                    amenities: listingData.amenities.filter((amenity: string) => amenity !== name)
                })
            }
        }
    };

    const deletePhoto = (photoURL: string) => {
        const newData: ListingFormData = {...listingData};

        if (listingData.photos) {
            newData.photos = listingData.photos.filter((photo: string) => {
                return photo !== photoURL
            });
        }

        if (listingData.photosToRemove) {
            newData.photosToRemove = [...listingData.photosToRemove, photoURL];
        } else {
            newData.photosToRemove = [photoURL];
        }

        setListingData(newData);
    }

    const handlePhotosToAdd = (files: File[], undo: boolean) => {
        console.log({files})
        if (files) {
            if (undo) { // undo adding new photos
                if (listingData.photosToAdd) {
                    setListingData({
                        ...listingData,
                        photosToAdd: [...listingData.photosToAdd.filter((file: File) => files.indexOf(file) === -1)]
                    })
                }
            } else { // add new photos
                if (listingData.photosToAdd) {
                    setListingData({...listingData, photosToAdd: [...listingData.photosToAdd, ...files]})
                } else {
                    setListingData({...listingData, photosToAdd: files})
                }
            }
        }
    };

    const onFinish = () => {
        // updating
        if (listingId) {
            updateListing(listingData, setNotificationMessage, setListingData, setNextLoading, listingId, navigate);
        }
        // creating new listing
        else {
            createListing(setNextLoading, listingData, setNotificationMessage, setListingData, navigate);
        }
    };

    const onExit = () => {
        if (listingId) {
            navigate(`/listings/${listingId}`)
        } else {
            const toSave = {
                ...listingData,
                photosToAdd: [],
                photosToRemove: []
            };
            localStorage.setItem('lastListing', JSON.stringify(toSave));
            navigate('/listings');
        }
    };

    return (
        <Stack>
            {notificationMessage && <Notification message={notificationMessage}/>}
            <StepperStyled loadingNext={nextLoading} steps={[
                Step1({listingData, handleChange}),
                Step2({listingData, handleChange}),
                Step3({listingData, handleChange: handleLocationChange}),
                Step4({listingData, handleChange: handleLocationChange, setListingData}),
                Step5({listingData, handleChange: handleArrayChange}),
                Step6({listingData, handlePhotosToAdd, deletePhoto}),
                Step7({listingData, handleChange}),
                Step8({listingData, handleChange})
            ]} onFinish={onFinish} finishLabel={'Post Listing'} onExit={onExit}/>
        </Stack>
    );
}

export default CreateListing;