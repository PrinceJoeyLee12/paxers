import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//material ui
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { checkCategoryAvailabilityInAll } from '../../utils/checkCategoryAvailability';
import { checkRegistrationStatus } from '../../utils/checkRegistrationStatus';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    variant: 'outlined',
    backgroundColor: 'rbg(255,0,0,.89)',
  },
}));

const RegistrationButton = ({
  history,
  title,
  id,
  categories,
  location,
  user,
  registrationEnd,
}) => {
  const classes = useStyles();
  const [isThereASlotAvailable, setIsThereASlotAvailable] = useState(false);

  useEffect(() => {
    if (categories) {
      setIsThereASlotAvailable(checkCategoryAvailabilityInAll(categories));
    }
  }, [setIsThereASlotAvailable, categories]);

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '10px',
        }}>
        <Button
          variant='outlined'
          className={classes.root}
          color='secondary'
          disableElevation
          disabled={
            !(isThereASlotAvailable && checkRegistrationStatus(registrationEnd))
          }
          onClick={() => {
            localStorage.setItem('prevPath', location.pathname);
            user === undefined || user._id === undefined
              ? history.push('/login')
              : history.push(`/form/${title}/${id}`);
          }}>
          <Typography variant='subtitle1'>Register Now</Typography>
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(withRouter(RegistrationButton));
