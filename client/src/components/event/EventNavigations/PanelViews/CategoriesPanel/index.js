import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import Categories from './Category';
import CategoriesAccordion from '../CategoriesAccordion';

//Material UI
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const CategoriesPanel = ({
  event: { categories, distanceTypeIsKM, registrationEnd },
}) => {
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
          Distances
        </Typography>
      </Grid>
      {readyToView ? (
        categories.map((category, index) => (
          <CategoriesAccordion
            key={index}
            distanceTypeIsKM={distanceTypeIsKM}
            distance={category.distance}>
            <Categories
              category={category}
              distanceTypeIsKM={distanceTypeIsKM}
              registrationEnd={registrationEnd}
            />
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

CategoriesPanel.propTypes = {
  categories: PropTypes.array,
  distanceTypeIsKM: PropTypes.bool,
};

const mapStateToProps = state => ({
  event: state.event.event,
});

export default connect(mapStateToProps, null)(CategoriesPanel);
