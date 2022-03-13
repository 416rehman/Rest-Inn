import {
    Button,
    Input,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";
import {LightbulbOutlined} from "@mui/icons-material";

const PhotoThumb = ({handleRemove, src}: { handleRemove: any, src: any }) => {
    return (
        <Stack position={'relative'} maxWidth={'80px'} height={'100%'} sx={{
            '&:hover': {
                '& button': {
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    visibility: 'visible',
                }
            }
        }}>
            <img src={src} alt={'photo'} style={{borderRadius: '0.5rem', height: '100%', objectFit: 'cover'}}/>
            <Button variant={'outlined'} size={'small'} color={'error'} onClick={() => {
                handleRemove()
            }} sx={{
                border: '5px solid #e6e6e6',
                visibility: 'hidden',
                position: 'absolute',
                width: '100%',
                height: '100%',
                '&:hover': {
                    visibility: 'visible',
                }
            }}>Remove </Button>
        </Stack>
    )
}

export default function Step6({listingData, handlePhotosToAdd, deletePhoto}: any) {
    const Input = styled('input')({
        display: 'none',
    });

    const ContentElement = () => {
        return (
            <Stack gap={'2rem'} direction={'row'} flexWrap={'wrap'} justifyContent={'center'}>
                <Stack gap={'3rem'}>
                    <Stack>
                        <Typography variant={"body1"} fontWeight={'500'}>
                            Add photos to your listing
                        </Typography>
                        <Typography variant={"subtitle2"} color={'gray'}>
                            Photos help guests imagine staying in your place. Let's add some to your listing.
                        </Typography>
                    </Stack>

                    <label htmlFor="contained-button-file">
                        <Input accept="image/jpeg, image/png, image/jpg" id="contained-button-file" type="file"
                               onChange={event => {
                                   handlePhotosToAdd(event.target.files)
                               }} multiple/>
                        <Button fullWidth variant="contained" component="span" sx={{
                            height: '3rem',
                            borderRadius: '0.5rem',
                        }}>
                            Upload
                        </Button>
                    </label>
                    {
                        listingData.photosToAdd?.length ? (
                            <Stack>
                                <Typography variant={"subtitle2"} color={'gray'}>
                                    Photos to add
                                </Typography>
                                <Stack direction={'row'} height={'100px'} gap={'1rem'}>
                                    {listingData.photosToAdd && listingData.photosToAdd.map((file: any) => {
                                        const src = URL.createObjectURL(file);
                                        return <PhotoThumb key={src}
                                                           handleRemove={() => handlePhotosToAdd([file], true)}
                                                           src={src}/>
                                    })}
                                </Stack>
                            </Stack>) : null
                    }
                    {/*already uploaded photos*/}
                    {
                        listingData.photos?.length ? <Stack>
                                <Typography variant={"subtitle2"} color={'gray'}>
                                    Photos you have added
                                </Typography><Stack direction={'row'} height={'100px'} gap={'1rem'}>
                            {listingData.photos.map((src: any) => {
                                return <PhotoThumb key={src} handleRemove={() => deletePhoto(src)} src={src}/>
                            })}
                        </Stack></Stack> : null
                    }
                </Stack>
                <Stack gap={'1rem'} maxWidth={'20rem'} sx={{
                    border: '1px solid #e6e6e6',
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    padding: '1rem'
                }}>
                    <LightbulbOutlined color={'warning'}/>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Tips to get great photos of your space
                    </Typography>
                    <Typography variant={"body1"} color={'gray'} fontSize={'0.9rem'}>
                        Make sure all your photos are inside the property.
                    </Typography>
                    <Typography variant={"body1"} color={'gray'} fontSize={'0.9rem'}>
                        Try to capture the entire space, including furniture and accessories.
                    </Typography>
                    <Typography variant={"body1"} color={'gray'} fontSize={'0.9rem'}>
                        Try to avoid using lighting from streetlights or other natural sources.
                    </Typography>
                    <Typography variant={"body1"} color={'gray'} fontSize={'0.9rem'}>
                        Make sure your photos are high quality.
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    const canContinue = () => {
        return listingData.photosToAdd?.length || listingData.photos?.length
    }

    return {
        label: "Set the scene",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}