import React from 'react';

//material UI
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Organizer = ({ organizerAvatar, organizerId }) => {
  const classes = useStyles();

  return (
    <>
      <div style={{ textAlign: '-webkit-center', marginTop: '-39px' }}>
        <Avatar
          alt='Organizer'
          src={organizerAvatar}
          className={classes.avatar}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            console.log(`Organizer's Id ${organizerId}.`);
          }}
        />
      </div>
    </>
  );
};

export default Organizer;
