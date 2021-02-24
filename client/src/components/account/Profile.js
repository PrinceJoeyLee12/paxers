import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { toast } from 'react-toastify';

//actions
import { updateUserProfilePicture } from '../../actions/user';

//material ui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core';

//icons
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
  label: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  iconReset: {
    display: 'none',
  },
  successButton: {
    '& .Mui-disabled': {
      color: 'rgba(255, 255, 255, 0)', // (default alpha is 0.38)
      backgroundColor: 'green',
    },
  },
  input: {
    display: 'none',
  },
  disabledInput: {
    disabled: true,
  },
  sportsTypography: {
    textAlign: 'center',
  },
}));

const Profile = ({
  className,
  user: { firstName, lastName, image, city, country, _id, mySports },
  updateUserProfilePicture,
  ...rest
}) => {
  const classes = useStyles();
  const timer = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadImage, setUploadImage] = useState({
    file: '',
    filePath: '',
  });

  const { file, filePath } = uploadImage;

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = event => {
    setUploadImage({
      file: event.target.files[0],
      filePath: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleReset = () => {
    setUploadImage({
      file: '',
      filePath: '',
    });
    setIsLoading(false);
    setSuccess(false);
  };

  const handleResponse = (msg, status) => {
    setIsLoading(false);
    toast[`${status === 200 ? 'success' : 'error'}`](msg);
    if (status === 200) {
      setSuccess(true);
      setUploadImage({
        file: '',
        filePath: '',
      });
      timer.current = window.setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setSuccess(false);
    }
  };

  const handleSubmit = async () => {
    if (!isLoading && !success) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', file);
      updateUserProfilePicture(formData, _id, handleResponse);
    }
  };

  return (
    <Card className={classnames(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar
            className={classes.avatar}
            src={filePath ? filePath : image}
          />
          <Typography
            color='textPrimary'
            gutterBottom
            variant={
              firstName.concat(` ${lastName}`).split('').length > 23
                ? 'h5'
                : 'h6'
            }>
            {firstName.concat(` ${lastName}`)}
          </Typography>
          <Typography
            color='textSecondary'
            variant='body1'
            className={classes.sportsTypography}>
            {mySports.join()}
          </Typography>
          <Typography
            className={classes.dateText}
            color='textSecondary'
            variant='body1'>
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Tooltip title='Reset image' aria-label='reset'>
          <IconButton
            disableRipple
            size='small'
            color='secondary'
            onClick={handleReset}
            className={classnames({
              [classes.iconReset]: !filePath || (isLoading && !success),
            })}>
            <RotateLeftOutlinedIcon />
          </IconButton>
        </Tooltip>

        {filePath ? (
          <Button
            color='primary'
            fullWidth
            variant='text'
            component='span'
            onClick={handleSubmit}>
            {!isLoading ? 'Upload Now' : 'Uploading...'}
          </Button>
        ) : (
          <>
            <input
              accept='image/*'
              id='profile-image-upload'
              type='file'
              onChange={handleChange}
              className={classnames(classes.input, {
                [classes.disabledInput]: success,
              })}
            />
            <label
              htmlFor='profile-image-upload'
              className={classnames(classes.label)}>
              <Button
                color='primary'
                fullWidth
                variant='text'
                component='span'
                disabled={success}
                className={classnames({ [classes.successButton]: success })}>
                {success ? 'Picture Uploaded' : 'Upload picture'}
              </Button>
            </label>
          </>
        )}
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  updateUserProfilePicture: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserProfilePicture })(Profile);
