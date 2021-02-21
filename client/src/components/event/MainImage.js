import React from 'react';

//material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '200px',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MainImage = ({ image }) => {
  const classes = useStyles();

  return (
    <>
      {image ? (
        <CardMedia
          component='img'
          className={classes.media}
          image={image}
          title='Contemplative Reptile'
        />
      ) : (
        <div style={{ paddingTop: '50px', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MainImage;
