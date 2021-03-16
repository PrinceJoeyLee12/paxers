import React, { Suspense } from 'react';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

//components
import DialogBox from './DialogBox';
const Navbar = React.lazy(() => import('./Navbar'));

const MyRacesAndActivities = () => {
  return (
    <Fragment>
      <ToastContainer />
      <DialogBox />
      <Suspense fallback='Loading...'>
        <Navbar />
      </Suspense>
    </Fragment>
  );
};

export default MyRacesAndActivities;
