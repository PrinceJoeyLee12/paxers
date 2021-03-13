import React, { Fragment, Suspense } from 'react';

//material ui
import { CircularProgress } from '@material-ui/core';

//components
const RenderEvents = React.lazy(() => import('../events/Events'));

const Landing = () => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div style={{ paddingTop: '50px', textAlign: 'center' }}>
            <CircularProgress />
          </div>
        }>
        <RenderEvents />
      </Suspense>
    </Fragment>
  );
};

export default Landing;
