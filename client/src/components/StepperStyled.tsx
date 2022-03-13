import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {MobileStepper, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";

interface IStep {
    label: string;
    content: React.ReactElement;
    optional?: boolean;
    canContinue?: () => boolean;
}

interface IProps {
    steps: IStep[];
    finishLabel?: string;
    onFinish?: () => void;
    onExit?: () => void;
    loadingNext?: boolean;
    loadingPrev?: boolean;
}

export default function StepperStyled({steps, onFinish, onExit, finishLabel, loadingNext, loadingPrev}: IProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const isStepOptional = (step: number) => {
        return steps[step].optional;
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep === steps.length - 1) {
            return onFinish && onFinish();
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    // @ts-ignore
    // @ts-ignore
    return (

        <Box sx={{width: '100%'}}>
            <Stack>
                <Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" padding={'1rem'} color={'gray'}>
                            {steps[activeStep].label}
                        </Typography>

                        <Button onClick={onExit}>
                            Exit and Save
                        </Button>
                    </Stack>
                    <MobileStepper variant={"progress"}
                                   activeStep={activeStep}
                                   backButton={
                                       <></>}
                                   nextButton={
                                       <></>}
                                   steps={steps.length}
                                   position="static"
                                   sx={{flexGrow: 1, '& .MuiLinearProgress-root': {width: '100%'}}}
                    />
                </Stack>

            </Stack>
            {(
                <React.Fragment>
                    <Stack padding={'1rem'}>
                        {steps[activeStep].content}
                    </Stack>
                    <Box sx={{display: 'flex', flexDirection: 'row', padding: 2}}>
                        <LoadingButton
                            loading={loadingPrev}
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </LoadingButton>
                        <Box sx={{flex: '1 1 auto'}}/>
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                Skip
                            </Button>
                        )}
                        <LoadingButton loading={loadingNext} variant={'outlined'} disableElevation onClick={handleNext} disabled={
                            // @ts-ignore
                            steps[activeStep].canContinue !== undefined ? !steps[activeStep].canContinue() : false
                        }>
                            {activeStep === steps.length - 1 ? finishLabel || 'Finish' : 'Next'}
                        </LoadingButton>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}