import React from 'react';
import { withRouter } from 'react-router';

//utils
import { checkRegistrationStatus } from '../../../utils/checkRegistrationStatus';
import { checkCategoryAvailabilityInAll } from '../../../utils/checkCategoryAvailability';

//Components
import EventImages from './EventImages';

//Material Ui
import { Typography, Button } from '@material-ui/core';

const DropDownInfo = ({
  history,
  eventImgs,
  description,
  eventId,
  eventTitle,
  registrationEnd,
  categories,
}) => {
  return (
    <>
      <EventImages eventImgs={eventImgs} />
      <Typography paragraph>{description}....</Typography>
      <Button
        variant='contained'
        fullWidth
        style={{ marginTop: '10px' }}
        color='primary'
        onClick={() => {
          history.push(`/event/${eventTitle}/${eventId}`);
        }}>
        View Event
      </Button>
      <Button
        variant='contained'
        fullWidth
        style={{ marginTop: '10px' }}
        color='secondary'
        disabled={
          !(
            checkRegistrationStatus(registrationEnd) &&
            checkCategoryAvailabilityInAll(categories)
          )
        }
        onClick={() => {
          history.push(`/form/${eventTitle}/${eventId}`);
        }}>
        Register Now!
      </Button>
    </>
  );
};

export default withRouter(DropDownInfo);
