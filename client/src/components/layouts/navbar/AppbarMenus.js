import React, { useState } from 'react';
import classnames from 'classnames';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//component
import Profile from './Profile';
import Notifications from './Notifications';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Divider, Badge } from '@material-ui/core';

//icons
import { Bell as BellIcon, User as UserIcon } from 'react-feather';

//Styling
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  icons: {
    fontSize: 'default',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
  },
  headerOptions: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  divider: {
    height: 40,
    margin: 4,
    color: 'grey',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const AppbarSettings = ({ isAuthenticated }) => {
  const classes = useStyles();

  //State for Menus
  const [profile, setProfile] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleProfileOpen = event => {
    setProfile(event.currentTarget);
  };

  const handleNotificationsOpen = event => {
    setNotifications(event.currentTarget);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className={classes.headerOptions}>
          <IconButton
            aria-label='show 17 new notifications'
            color='inherit'
            onClick={handleNotificationsOpen}>
            <Badge badgeContent=' ' color='secondary' variant='dot'>
              <BellIcon className={classes.icons} />
            </Badge>
          </IconButton>
          <Divider className={classes.divider} orientation='vertical' />
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-haspopup='true'
            color='inherit'
            onClick={handleProfileOpen}>
            <UserIcon
              className={classnames(classes.menuButton, classes.icons)}
            />
          </IconButton>
          <Profile profile={profile} setProfile={setProfile} />
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

AppbarSettings.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(AppbarSettings);
