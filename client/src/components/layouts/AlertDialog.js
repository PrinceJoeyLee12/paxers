import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//actions
import { removeDialog } from '../../actions/alert';

//material UI
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
} from '@material-ui/core';

const AlertDialog = ({
  alert: { title, msg, btnTxt1, btnTxt2, link },
  removeDialog,
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (title !== '' && msg !== '' && btnTxt1 !== '') {
      setOpen(true);
    }
  }, [title, msg, btnTxt1, setOpen]);

  const handleClose = () => {
    removeDialog();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {link !== '' ? (
            <Link to={link} style={{ textDecoration: 'none' }}>
              <Button onClick={handleClose} color='primary'>
                <Typography>{btnTxt1}</Typography>
              </Button>
            </Link>
          ) : (
            <Button onClick={handleClose} color='primary'>
              {btnTxt1}
            </Button>
          )}
          {btnTxt2 !== '' ? (
            <Button onClick={handleClose} color='primary'>
              <Typography style={{ textDecoration: 'none' }}>
                {btnTxt2}
              </Typography>
            </Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  btnTxt: PropTypes.string,
  removeDialog: PropTypes.func,
};

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { removeDialog })(AlertDialog);
