import React from 'react';

//Material Ui
import { IconButton, Badge, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: red[500],
    marginTop: '-50%',
    marginLeft: '70%',
  },
}));
const EventImage = ({ organizerAvatar }) => {
  const classes = useStyles();

  return (
    <>
      <IconButton aria-label='cart'>
        <Badge
          badgeContent={
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              src={organizerAvatar}
              to='#'>
              R
            </Avatar>
          }></Badge>
      </IconButton>
    </>
  );
};

export default EventImage;
