import {
    Checkbox,
    FormControlLabel,
    FormGroup, Grid,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import {stepProps} from "./@typings";
import {useSelector} from "react-redux";

export default function Step5({listingData, handleChange}: stepProps) {
    const {amenities} = useSelector((state: any)=>state.meta)

    const ContentElement = () => {
        return(
            <Stack gap={'2rem'}>
                <Typography variant={"body1"} fontWeight={'500'}>
                    What amenities do you offer?
                </Typography>
                <Typography variant={"subtitle2"} color={'gray'}>
                    These are some of the amenities guests usually expect, you can add more later on.
                </Typography>
                <FormGroup>
                    <Grid container columns={16}>
                        {amenities.map((a:any)=>{
                            return <Grid key={a._id} item sm={8} xs={16}><FormControlLabel sx={{textTransform: 'capitalize'}} checked={
                                listingData.amenities?.includes(a._id)
                            } onChange={(e:any)=>{
                                handleChange(e.target.name, e.target.checked)
                            }} control={<Checkbox name={a._id}/>} label={a._id} /></Grid>
                        })}
                    </Grid>
                </FormGroup>
            </Stack>
        )
    }

    const canContinue = () => {
        return true
    }

    return {
        label: "Guest's experience",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}