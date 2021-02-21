import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import classnames from 'classnames';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//actions
import {
  getUpcomingEventByTransactionId,
  setChanges,
  removeRowSelected,
} from '../../actions/activity';
import { uploadImage } from '../../actions/registrantsInfo';

//material ui
import {
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//material ui colors
import { green } from '@material-ui/core/colors';

//material icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
//material ui styles

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  grid: {
    marginBottom: '200px',
  },
  gridItem: {
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

//for loading padding
const RenderFallbackOption = ({ children, ...other }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>{children}</div>
  );
};

const RegistrationStatus = ({
  history,
  match,
  rowSelected,
  getUpcomingEventByTransactionId,
  uploadImage,
  setChanges,
  removeRowSelected,
}) => {
  const classes = useStyles();
  const [readyToView, setReadyToView] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState({
    imagePath: '',
    imageName: '',
  });

  const { imagePath, imageName } = image;
  useEffect(() => {
    if (Object.keys(rowSelected).length === 0)
      //if link comes from somewhere else where selectedRow from redux activity state is empty
      getUpcomingEventByTransactionId(
        match.params.userId,
        match.params.transactionId,
      );
    else {
      setImage({ ...image, imagePath: rowSelected.paymentImage });
      setReadyToView(true);
    }
    // eslint-disable-next-line
  }, [
    rowSelected,
    match.params.userId,
    match.params.transactionId,
    getUpcomingEventByTransactionId,
  ]);

  const handleChange = event => {
    setImage({
      imagePath: event.target.files[0],
      imageName: event.target.files[0].name,
    });
  };

  const handleResponse = (msg, status) => {
    toast[`${status === 200 ? 'success' : 'error'}`](`${msg}`);
    if (status === 200) {
      setChanges(true);
      setSuccess(true);
      setSending(false);
      setImage({ ...image, imagePath: rowSelected.paymentImage });
    } else {
      setSending(false);
    }
  };

  const handleUpload = async () => {
    if (!sending && !success) {
      setSuccess(false);
      setSending(true);
      const formData = new FormData();
      formData.append('file', imagePath);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_UPLOAD_PRESENT_RECEIPTS,
      );

      //save image to cloudinary
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL,
        formData,
      );
      if (res.data.secure_url !== undefined) {
        uploadImage(res.data.secure_url, rowSelected.id, handleResponse);
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      {readyToView ? (
        <Paper className={classes.root}>
          <Grid
            container
            justify='center'
            alignItems='center'
            className={classes.grid}>
            {rowSelected.status !== 'unpaid' &&
            rowSelected.paymentImage !== '' ? (
              <Grid item xs={12} className={classes.gridItem}>
                <Image src={imagePath} className={classes.image}></Image>
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12} className={classes.gridItem}>
              <Typography variant='h6' style={{ paddingTop: '20px' }}>
                {imageName}
              </Typography>
            </Grid>
            {rowSelected.status === 'unpaid' ? (
              !success ? (
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: '30px' }}
                  className={classes.gridItem}>
                  <input
                    accept='image/*'
                    className={classes.input}
                    id='receipt-image-upload'
                    type='file'
                    onChange={handleChange}
                  />
                  <label htmlFor='receipt-image-upload'>
                    <Button
                      variant='contained'
                      color='primary'
                      component='span'
                      className={classes.button}
                      disabled={sending}
                      startIcon={<PhotoSizeSelectActualOutlinedIcon />}>
                      Select Screenshot of Payment
                    </Button>
                  </label>
                </Grid>
              ) : (
                ''
              )
            ) : (
              <Grid
                item
                xs={12}
                style={{ marginTop: '30px' }}
                className={classes.gridItem}>
                <Button
                  variant='contained'
                  color='secondary'
                  component='span'
                  className={classes.button}
                  onClick={() => {
                    removeRowSelected();
                    history.goBack() === undefined
                      ? history.push('/my-activities')
                      : history.goBack();
                  }}
                  startIcon={<ArrowBackOutlinedIcon />}>
                  Go Back
                </Button>
              </Grid>
            )}
            {imageName !== '' ? (
              <Grid
                item
                xs={12}
                style={{ marginTop: '30px' }}
                className={classes.gridItem}>
                <Button
                  variant='contained'
                  color='secondary'
                  component='span'
                  className={classnames(classes.button, {
                    [classes.buttonSuccess]: success,
                  })}
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                  disabled={sending}>
                  {success ? 'Uploaded' : 'Upload'}
                  {sending && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Paper>
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </Fragment>
  );
};

RegistrationStatus.propTypes = {
  getUpcomingEventByTransactionId: PropTypes.func,
  uploadImage: PropTypes.func,
  setChanges: PropTypes.func,
  removeRowSelected: PropTypes.func,
};

const mapStateToProps = state => ({
  rowSelected: state.activity.rowSelected,
});

export default connect(mapStateToProps, {
  getUpcomingEventByTransactionId,
  uploadImage,
  setChanges,
  removeRowSelected,
})(RegistrationStatus);
