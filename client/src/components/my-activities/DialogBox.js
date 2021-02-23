import React, { useEffect, useState, forwardRef, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

//actions
import { removeRowSelected } from '../../actions/activity';

//material ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Chip, Grid, Typography } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogBox = ({ rowSelected, removeRowSelected, history }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  useEffect(() => {
    if (rowSelected && Object.keys(rowSelected).length > 0) {
      setData(rowSelected);
      setOpen(true);
    }
  }, [rowSelected]);

  const handleClose = () => {
    removeRowSelected();
    setData({});
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        scroll='paper'
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>
          {data.status === 'paid' || data.status === 'in-review'
            ? "Click the 'Link' to view Payment Details"
            : "Click the 'Link' to Redirect"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-slide-description'
            component='div'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Name of Event:  `}
                  <Typography display='inline' color='secondary'>
                    {data.nameOfEvent}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Date of Event:  `}
                  <Typography display='inline' color='secondary'>
                    {data.dateOfEvent}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Distance selected:  `}
                  <Typography display='inline' color='secondary'>
                    {data.distance}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Date Reserved:  `}
                  <Typography display='inline' color='secondary'>
                    {data.dateReserved}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Expiration Date:  `}
                  <Typography display='inline' color='secondary'>
                    {data.expirationDate}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Payment Method:  `}
                  <Typography display='inline' color='secondary'>
                    {data.paymentMethod}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Amount:  `}
                  <Typography display='inline' color='secondary'>
                    {data.amountToPay}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Transaction ID:  `}
                  <Typography display='inline' color='secondary'>
                    {data.transactionId}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='primary' component='div'>
                  {`Status:  `}
                  <Typography display='inline' color='secondary'>
                    {data.status}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography display='inline' color='primary' component='div'>
                  {`Link:  `}
                  <Typography
                    display='inline'
                    color='secondary'
                    component='div'>
                    <Chip
                      label={data.link}
                      color='secondary'
                      variant='outlined'
                      onClick={() => {
                        history.push(
                          `${`${data.link}`.slice(
                            window.location.origin.length,
                          )}`,
                        );
                      }}
                    />
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DialogBox.propTypes = {
  removeRowSelected: PropTypes.func,
};

const mapStateToProps = state => ({
  rowSelected: state.activity.rowSelected,
});

export default connect(mapStateToProps, { removeRowSelected })(
  withRouter(DialogBox),
);
