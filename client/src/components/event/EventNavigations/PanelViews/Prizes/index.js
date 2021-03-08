import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import CategoriesAccordion from '../CategoriesAccordion';
import PrizesDataGrid from './PrizesDataGrid';

//material ui
import { CircularProgress, Grid, Typography } from '@material-ui/core';
const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const Prizes = ({ categories, distanceTypeIsKM }) => {
  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (categories !== undefined) {
      setReadyToView(true);
    }
  }, [setReadyToView, categories]);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary'>
          Prizes
        </Typography>
      </Grid>
      {readyToView ? (
        categories.map((category, index) => (
          <CategoriesAccordion
            key={index}
            distanceTypeIsKM={distanceTypeIsKM}
            distance={category.distance}>
            {category.prizes.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <Typography variant='h6' color='primary'>
                    {category.prizes.map((prize, index) => (
                      <PrizesDataGrid key={index} prize={prize} />
                    ))}
                  </Typography>
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

Prizes.propTypes = {
  categories: PropTypes.array.isRequired,
  distanceTypeIsKM: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  categories: state.event.event.categories,
  distanceTypeIsKM: state.event.event.distanceTypeIsKM,
});
export default connect(mapStateToProps, null)(Prizes);
