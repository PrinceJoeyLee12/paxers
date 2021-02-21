import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, List, Box, Avatar } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import SidebarMenus from './SidebarMenus';

const useStyles = makeStyles(theme => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  sportsType: {
    textAlign: 'center',
  },
}));

const SidebarSettings = ({
  auth: {
    isAuthenticated,
    user: { image, mySports, firstName, lastName },
  },
  sidebarMenus,
  handleDrawerToggle,
}) => {
  const classes = useStyles();

  return (
    <>
      {isAuthenticated ? (
        <>
          <List>
            <Box
              alignItems='center'
              display='flex'
              flexDirection='column'
              p={2}>
              <Avatar className={classes.avatar} src={image} to='#' />
              <Typography
                className={classes.name}
                color='textPrimary'
                variant='h5'>
                {firstName.concat(` ${lastName}`)}
              </Typography>
              <Typography
                color='textSecondary'
                variant='body2'
                className={classes.sportsType}>
                {mySports ? mySports.join() : ''}
              </Typography>
            </Box>
          </List>
          <Divider />
        </>
      ) : (
        <div style={{ paddingTop: '10%' }}> </div>
      )}
      <List>
        {sidebarMenus.map((item, index) => (
          <SidebarMenus
            handleDrawerToggle={handleDrawerToggle}
            index={index}
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
    </>
  );
};

SidebarSettings.propTypes = {
  isAuthenticated: PropTypes.bool,
  sidebarMenus: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  sidebarMenus: state.menuItems.sidebarMenus,
});

export default connect(mapStateToProps, null)(SidebarSettings);
