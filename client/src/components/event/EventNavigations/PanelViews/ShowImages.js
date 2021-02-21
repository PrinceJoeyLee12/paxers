import React from 'react';

//components
import EventImages from '../../../events/initialEventView/EventImages';

//material ui
import { Grid } from '@material-ui/core';

const ShowImages = ({ ImageArray }) => {
  return (
    <>
      {' '}
      <Grid item xs={12}>
        <EventImages eventImgs={ImageArray} />
      </Grid>
    </>
  );
};

export default ShowImages;
