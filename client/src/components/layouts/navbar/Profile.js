import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//actions
import { logout } from '../../../actions/auth';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Popper,
  Paper,
  Grow,
  Box,
  Avatar,
} from '@material-ui/core';

//Styling
const useStyles = makeStyles(theme => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  box: {
    maxWidth: '200px',
    padding: 0,
    marginBottom: '10px',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  popper: {
    marginLeft: '-200px',
  },
}));
const Profile = ({
  profile,
  setProfile,
  logout,
  history,
  user: { image, mySports, firstName, lastName },
}) => {
  const classes = useStyles();

  const [openProfile, setOpenProfile] = useState(profile ? true : false);

  useEffect(() => {
    setOpenProfile(profile ? true : false);
  }, [profile, setOpenProfile]);

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setProfile(false);
    }
  };

  return (
    <>
      <Box zIndex='tooltip'>
        <Popper
          open={openProfile}
          anchorEl={profile ? profile : ''}
          role={undefined}
          transition
          className={classes.popper}
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={() => setProfile(false)}>
                  <MenuList
                    autoFocusItem={openProfile}
                    id='menu-list-grow'
                    onKeyDown={handleListKeyDown}>
                    <MenuItem
                      onClick={() => {
                        setProfile(false);
                        history.push('/account/me');
                      }}>
                      <Box
                        alignItems='center'
                        display='flex'
                        flexDirection='column'
                        p={2}
                        className={classes.box}>
                        <Avatar
                          className={classes.avatar}
                          src={image}
                          onClick={() => {
                            history.push('/account/me');
                          }}
                        />
                        <Typography
                          className={classes.name}
                          color='textPrimary'
                          variant='h5'>
                          {firstName.concat(` ${lastName}`)}
                        </Typography>
                        <Typography color='textSecondary' variant='body2'>
                          {mySports ? mySports.join() : ''}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setProfile(false);
                        history.push('/account/me');
                      }}>
                      My account
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setProfile(false);
                        logout();
                      }}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

Profile.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(withRouter(Profile));
