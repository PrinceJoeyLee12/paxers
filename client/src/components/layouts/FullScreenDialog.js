import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//utils
import { toSentenceFormat, charReplacer } from '../../utils/textFormater';
import {
  formatToCurrency,
  distanceTypeIsNumber,
} from '../../utils/numberFormater';

//actions
import { setDialog } from '../../actions/alert';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  option: {
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  typography: {
    fontSize: '1.2rem',
  },
  amountToPay: {
    fontSize: '1.3rem',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const FullScreenDialog = ({
  registrantsInfo,
  event: { distanceTypeIsKM, title },
  setDialog,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setDialog(
      'Note',
      "Once you clicked 'Proceed' you can no longer able to edit your provided information. So make sure everything is correct.You'll be redirected to Payment Page",
      'Proceed',
      'Close',
      `/payment/${charReplacer(title, ' ', '-')}/${registrantsInfo.eventId}`,
    );
    setOpen(false);
  };

  useEffect(() => {
    registrantsInfo === undefined ||
    registrantsInfo.eventId === undefined ||
    registrantsInfo.data.firstName === '' ||
    distanceTypeIsKM === undefined
      ? setOpen(false)
      : setOpen(true);
  }, [registrantsInfo, distanceTypeIsKM]);

  return (
    <Fragment>
      <Dialog
        fullScreen
        fullWidth
        scroll='body'
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Review Data
            </Typography>
            <Button autoFocus color='inherit' onClick={handleSubmit}>
              Confirm
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent dividers={true}>
          <DialogContentText
            id='scroll-dialog-description'
            tabIndex={-1}
            component='div'>
            <Grid
              className={classes.option}
              container
              spacing={2}
              component='span'
              justify='center'
              alignItems='flex-start'>
              {Object.keys(registrantsInfo.data).map((value, index) => (
                <Fragment key={index}>
                  <Grid item xs={8} sm={6}>
                    <Typography className={classes.typography} color='primary'>
                      {`${toSentenceFormat(value)}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Typography
                      display='inline'
                      className={classes.typography}
                      color='secondary'>
                      {value !== 'categorySelected'
                        ? registrantsInfo.data[value]
                        : `${registrantsInfo.data[value]} ${
                            distanceTypeIsNumber(registrantsInfo.data[value])
                              ? distanceTypeIsKM
                                ? 'Km'
                                : 'Miles'
                              : ''
                          }`}{' '}
                    </Typography>
                  </Grid>
                </Fragment>
              ))}
              <Grid item xs={8} sm={6}>
                <Typography className={classes.typography} color='primary'>
                  Registration Fee:
                </Typography>
              </Grid>
              <Grid item xs={4} sm={6}>
                <Typography
                  display='inline'
                  className={classes.typography}
                  color='secondary'>
                  {formatToCurrency.format(registrantsInfo.payment.amountToPay)}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

FullScreenDialog.propTypes = {
  storeRegistrantsData: PropTypes.func,
  setDialog: PropTypes.func,
  registrantsInfo: PropTypes.object,
  event: PropTypes.object,
};

const mapStateToProps = state => ({
  registrantsInfo: state.registrantsInfo,
  event: state.event.event,
});

export default connect(mapStateToProps, { setDialog })(FullScreenDialog);
