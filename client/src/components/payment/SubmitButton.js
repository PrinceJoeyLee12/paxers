import React, { Fragment, useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

//actions
import {
  storeRegistrantsData,
  clearRegistrantsData,
} from '../../actions/registrantsInfo';
import { clearForm } from '../../actions/form';
import { setChanges } from '../../actions/activity';

//utils

//material ui
import { Button, CircularProgress } from '@material-ui/core';
//material ui colors
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    padding: '20px',
    paddingTop: '50px',
    width: '100%',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SubmitButton = ({
  registrantsData,
  optionSelected,
  storeRegistrantsData,
  eventId,
  title,
  paymentOptions,
  clearRegistrantsData,
  clearForm,
  setChanges,
  user: { _id },
  history,
}) => {
  const classes = useStyles();
  const recaptchaRef = useRef();
  const timer = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const getDataFromPaymentOptionSelected = () => {
    let optionData = {};
    paymentOptions.forEach(option => {
      if (option.optionType === optionSelected) optionData = option;
    });
    return optionData;
  };

  const handleSubmit = async () => {
    if (!(sending || success)) {
      setSending(true);
      setSuccess(false);
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      storeRegistrantsData(
        _id,
        eventId,
        title,
        getDataFromPaymentOptionSelected(),
        registrantsData.data,
        `${optionSelected}`,
        registrantsData.payment.amountToPay,
        reservationStatus,
        token,
      );
    }
  };

  //forTimer
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const reservationStatus = (msg, status) => {
    toast[`${status}`](`${msg}`);

    setSending(false);
    if (status === 'success') {
      setChanges(true);
      setSuccess(true);
      clearForm();
      clearRegistrantsData();
      timer.current = window.setTimeout(() => {
        toast("You'll be redirected to new form", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 2000);
      timer.current = window.setTimeout(() => {
        history.goBack();
      }, 7000);
    } else {
      setSuccess(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className={classes.button}>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
          size='invisible'
          ref={recaptchaRef}
        />
        <Button variant='contained' color='secondary' onClick={handleSubmit}>
          Reserve my slot
          {sending && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </div>
    </Fragment>
  );
};

SubmitButton.propTypes = {
  storeRegistrantsData: PropTypes.func,
  setChanges: PropTypes.func,
  clearForm: PropTypes.func,
  clearRegistrantsData: PropTypes.func,

  registrantsData: PropTypes.object,
};

const mapStateToProps = state => ({
  registrantsData: state.registrantsInfo,
  user: state.auth.user,
  title: state.event.event.title,
  paymentOptions: state.event.event.paymentOptions,
});

export default connect(mapStateToProps, {
  storeRegistrantsData,
  clearRegistrantsData,
  clearForm,
  setChanges,
})(withRouter(SubmitButton));
