import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const ContactInfo = ({ contactInfos }) => {
  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (contactInfos !== undefined) {
      setReadyToView(true);
    }
  }, [setReadyToView, contactInfos]);

  return (
    <Fragment>
      <div style={{ marginBottom: '50px' }}>
        <Grid item xs={12}>
          <Typography variant='h6' color='primary'>
            Contact
          </Typography>
        </Grid>
        {readyToView ? (
          <>
            {contactInfos.length !== 0 ? (
              contactInfos.map((contactInfo, index) => (
                <div key={index} style={{ paddingTop: '10px' }}>
                  <Typography
                    display='inline'
                    variant='body1'
                    color='secondary'>
                    {contactInfo.type}
                    {' :  '}
                    <Typography
                      display='inline'
                      variant='subtitle1'
                      color='primary'
                      component='a'>
                      {contactInfo.address}
                    </Typography>
                  </Typography>
                </div>
              ))
            ) : (
              <RenderFallbackOption>Nothing follows....</RenderFallbackOption>
            )}
          </>
        ) : (
          <RenderFallbackOption>
            <CircularProgress />
          </RenderFallbackOption>
        )}
      </div>
    </Fragment>
  );
};

ContactInfo.propTypes = {
  contactInfos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  contactInfos: state.event.event.contactInfo,
});

export default connect(mapStateToProps, null)(ContactInfo);
