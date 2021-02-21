import React from 'react';
import PropTypes from 'prop-types';

//Material Ui
import { Box, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
const accent = lightGreen['A400'];

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    color: '#000',
  },
}));
const DisplayImage = ({ displayImg, title, isVirtual }) => {
  const classes = useStyles();

  return (
    <>
      <CardMedia
        className={classes.media}
        image={displayImg}
        title={
          <Typography style={{ color: '#000' }} variant='h4'>
            {title}
          </Typography>
        }
      />
      {isVirtual ? (
        <>
          <Box
            bgcolor={accent}
            color='text.primary'
            borderRadius='10px 0 0 10px'
            pl={3}
            pr={3}
            position='absolute'
            top={3}
            right={0}
            zIndex='modal'>
            <Typography variant='subtitle2'>V I R T U A L</Typography>
          </Box>
        </>
      ) : (
        ''
      )}
    </>
  );
};

DisplayImage.propTypes = {
  title: PropTypes.string,
};

export default DisplayImage;
