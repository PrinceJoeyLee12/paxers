import React from 'react';

//utils
import { distanceTypeIsNumber } from '../../../../utils/numberFormater';

//Material Ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Chip,
} from '@material-ui/core';

//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const CategoriesAccordion = ({ children, distance, distanceTypeIsKM }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Chip
              label={
                distance !== '' ? (
                  <Typography
                    className={classes.heading}
                    color='secondary'>{`${distance} ${
                    distanceTypeIsNumber(distance)
                      ? distanceTypeIsKM
                        ? 'KM'
                        : 'Miles'
                      : ''
                  }`}</Typography>
                ) : (
                  '---'
                )
              }
              color='primary'
              variant='outlined'
            />
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default CategoriesAccordion;
