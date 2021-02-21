import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//utils
import { toSentenceFormat } from '../../../../../utils/textFormater';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  option: {
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
  },
}));
const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const PaymentOptions = ({ paymentOptions }) => {
  const classes = useStyles();
  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (paymentOptions !== undefined) {
      setReadyToView(true);
    }
  }, [setReadyToView, paymentOptions]);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary'>
          Pay Through
        </Typography>
      </Grid>
      {readyToView ? (
        <>
          {paymentOptions.length !== 0 ? (
            paymentOptions.map((option, index) => (
              <div key={index}>
                <div style={{ paddingTop: '15px', paddingBottom: '20px' }}>
                  <Typography
                    display='block'
                    variant='h5'
                    color='textPrimary'
                    style={{ paddingBottom: '15px' }}>
                    {option.optionType}
                  </Typography>
                  {Object.keys(option).map((item, itemIndex) => (
                    <Grid
                      key={itemIndex}
                      container
                      spacing={2}
                      justify='center'
                      alignItems='flex-start'
                      className={classes.option}>
                      <Grid item xs={6}>
                        <Typography
                          display='inline'
                          variant='body1'
                          color='secondary'>
                          {toSentenceFormat(item)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          display='inline'
                          variant='subtitle1'
                          color='primary'
                          component='a'>
                          {option[`${item}`]}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </div>
                <Divider light={true} />
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
    </Fragment>
  );
};

PaymentOptions.propTypes = {
  paymentOptions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  paymentOptions: state.event.event.paymentOptions,
});

export default connect(mapStateToProps, null)(PaymentOptions);
