import React, { Fragment, useEffect, useState } from 'react';

//components
import CategoriesAccordion from '../CategoriesAccordion';
import ShowImages from '../ShowImages';

//material ui
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const RegistrationKits = ({ title, categories, distanceTypeIsKM, kitType }) => {
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
          {title}
        </Typography>
      </Grid>
      {readyToView ? (
        categories.map((category, index) => (
          <CategoriesAccordion
            key={index}
            distanceTypeIsKM={distanceTypeIsKM}
            distance={category.distance}>
            {category[`${kitType}Shirt`].images.length > 0 ? (
              <>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Grid container justify='center'>
                      <Grid item xs={12}>
                        <Typography variant='h6' color='primary'>
                          Shirt
                        </Typography>
                      </Grid>
                      <ShowImages
                        key={index}
                        ImageArray={category[`${kitType}Shirt`].images}
                      />
                    </Grid>
                  </Grid>
                  {/* Other Kits */}
                  {category[`${kitType}Kits`].length > 0 &&
                    category[`${kitType}Kits`].map((kit, index) => (
                      <Grid key={index} item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <Grid item xs={12}>
                            <Typography variant='h6' color='primary'>
                              {kit.variant}
                            </Typography>
                          </Grid>
                          <ShowImages ImageArray={kit.images} />
                        </Grid>
                      </Grid>
                    ))}
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

export default RegistrationKits;
