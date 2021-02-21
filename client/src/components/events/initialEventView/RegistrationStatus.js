import React, { useState, useEffect } from 'react';

//utils
import { checkRegistrationStatus } from '../../../utils/checkRegistrationStatus';

//Material Ui
import { Grid, Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import {
  XCircle as XCircleIcon,
  CheckCircle as CheckCircleIcon,
} from 'react-feather';

const useStyles = makeStyles(theme => ({
  registrationStatusOpen: {
    borderColor: 'green',
    backgroundColor: 'rgb(0,255,0,0.1)',
  },
  registrationStatusClose: {
    borderColor: 'red',
    backgroundColor: 'rgb(255,0,0,0.1)',
  },
}));
const RegistrationStatus = ({ registrationEnd }) => {
  const classes = useStyles();

  const [registrationIsOpen, setRegistrationIsOpen] = useState(false);

  useEffect(() => {
    if (checkRegistrationStatus(registrationEnd)) setRegistrationIsOpen(true);
    else setRegistrationIsOpen(false);
  }, [registrationEnd, setRegistrationIsOpen]);

  return (
    <>
      <Grid container justify='flex-end'>
        <Grid item>
          <Box pr={1} position='absolute' top={-22} right={8} zIndex='modal'>
            <Chip
              size='small'
              variant='outlined'
              className={
                registrationIsOpen
                  ? classes.registrationStatusOpen
                  : classes.registrationStatusClose
              }
              avatar={
                registrationIsOpen ? <CheckCircleIcon /> : <XCircleIcon />
              }
              label={
                registrationIsOpen ? 'Registration Open' : 'Registration Close'
              }
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationStatus;
