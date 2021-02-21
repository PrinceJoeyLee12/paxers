import React from 'react';
import Moment from 'react-moment';

//Material Ui
import { Typography } from '@material-ui/core';

//Components
import RegistrationStatus from './RegistrationStatus';

const InitialInfo = ({
  registrationEnd,
  eventLocation,
  categories,
  distanceTypeIsKM,
}) => {
  return (
    <>
      <RegistrationStatus registrationEnd={registrationEnd} />
      <div>
        <Typography variant='body2' color='primary' display='inline'>
          Location:{' '}
        </Typography>
        <Typography variant='body2' color='textSecondary' display='inline'>
          {eventLocation}
        </Typography>
      </div>
      <div>
        <Typography variant='body2' color='primary' display='inline'>
          Registration Deadline:{' '}
        </Typography>
        <Typography variant='body2' color='textSecondary' display='inline'>
          {registrationEnd !== '' ? (
            <Moment format='MMMM DD, YYYY ' date={registrationEnd} />
          ) : (
            'Not stated'
          )}
        </Typography>
      </div>
      <div>
        <Typography variant='body2' color='primary' display='inline'>
          Categories:
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          display='inline'
          component='p'>
          {categories.map((category, index) => (
            <span key={index}>
              {` ${category.distance}${distanceTypeIsKM ? 'km' : 'miles'}, `}
            </span>
          ))}
        </Typography>
      </div>
    </>
  );
};

export default InitialInfo;
