import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import CategoriesAccordion from '../CategoriesAccordion';
import ShowImages from '../ShowImages';

//material ui
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const Medals = ({ categories, distanceTypeIsKM }) => {
  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (categories !== undefined) {
      setReadyToView(true);
    }
  }, [categories, setReadyToView]);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary'>
          Medal for
        </Typography>
      </Grid>
      {readyToView ? (
        categories.map((category, index) => (
          <CategoriesAccordion
            key={index}
            distanceTypeIsKM={distanceTypeIsKM}
            distance={category.distance}>
            {category.medal.images !== undefined &&
            category.medal.images.length > 0 ? (
              <>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Grid container justify='center'>
                      <ShowImages
                        key={index}
                        ImageArray={category.medal.images}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <RenderFallbackOption key={index}>
                <h6>Nothing follows....</h6>
              </RenderFallbackOption>
            )}
          </CategoriesAccordion>
        ))
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </Fragment>
  );
};

Medals.propTypes = {
  categories: PropTypes.array.isRequired,
  distanceTypeIsKM: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  categories: state.event.event.categories,
  distanceTypeIsKM: state.event.event.distanceTypeIsKM,
});

export default connect(mapStateToProps, null)(Medals);
