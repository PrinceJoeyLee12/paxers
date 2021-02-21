import React, { Fragment, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';

//actions
import {
  storeRegistrantsData,
  clearRegistrantsData,
} from '../../actions/registrantsInfo';
import { clearForm } from '../../actions/form';
import { setChanges } from '../../actions/activity';

//utils

//material ui
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    padding: '20px',
    paddingTop: '50px',
    width: '100%',
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
  const timer = useRef();
  const getDataFromPaymentOptionSelected = () => {
    let optionData = {};
    paymentOptions.forEach(option => {
      if (option.optionType === optionSelected) optionData = option;
    });
    return optionData;
  };

  const handleSubmit = () => {
    storeRegistrantsData(
      _id,
      eventId,
      title,
      getDataFromPaymentOptionSelected(),
      registrantsData.data,
      `${optionSelected}`,
      registrantsData.payment.amountToPay,
      reservationSuccessStatus,
    );
  };

  //forTimer
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const reservationSuccessStatus = (msg, status) => {
    toast[`${status}`](`${msg}`);

    if (status === 'success') {
      setChanges(true);
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
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className={classes.button}>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>
          Reserve my slot
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
