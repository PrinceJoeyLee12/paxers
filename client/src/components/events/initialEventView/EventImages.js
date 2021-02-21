import React from 'react';

//Material Ui
import { Paper, Typography, MobileStepper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@material-ui/icons';

//For Event Image Carousel
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  //for Carosel
  rootCarousel: {
    maxWidth: 400,
    flexGrow: 1,
    padding: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));
const EventImages = ({ eventImgs }) => {
  const classes = useStyles();
  const theme = useTheme();

  //Stepper for images
  const [activeStep, setActiveStep] = React.useState(0);
  let maxSteps = 0;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <>
      <div className={classes.rootCarousel}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{eventImgs[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents>
          {eventImgs.map((step, index) => (
            <div key={index}>
              <span style={{ display: 'none' }}>{(maxSteps = index + 1)}</span>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position='static'
          variant='text'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
              Back
            </Button>
          }
        />
      </div>
    </>
  );
};

export default EventImages;
