import React from 'react';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

//components
import Navbar from './Navbar';
import DialogBox from './DialogBox';

const MyRacesAndActivities = () => {
  return (
    <Fragment>
      <ToastContainer />
      <DialogBox />
      <Navbar />
    </Fragment>
  );
};

export default MyRacesAndActivities;
