import React, { useState, useEffect } from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  List,
  ListItemText,
  Divider,
  ClickAwayListener,
  Popper,
  Paper,
  Grow,
  Box,
  Avatar,
} from '@material-ui/core';

//Styling
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));
const Notifications = ({ notifications, setNotifications }) => {
  const classes = useStyles();

  const [openNotifications, setOpenNotifications] = useState(
    notifications ? true : false,
  );

  useEffect(() => {
    setOpenNotifications(notifications ? true : false);
  }, [notifications, setOpenNotifications]);

  return (
    <>
      <Box zIndex='tooltip'>
        <Popper
          open={openNotifications}
          anchorEl={notifications}
          role={undefined}
          transition
          style={{ marginRight: '100px' }}
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={() => setNotifications(false)}>
                  <List className={classes.root}>
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar
                          alt='Event 1'
                          src='https://res.cloudinary.com/paxers/image/upload/v1614074468/events/event1_stawme.png'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Reservation Updated'
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'>
                              Ali Connors
                            </Typography>
                            {
                              ' Your reservation is confirmed please check your email for instructions…'
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar
                          alt='Event 1 Medal'
                          src='https://res.cloudinary.com/paxers/image/upload/v1614077403/events/event1-5km-medal_yax5db.png'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Congratulations!!!'
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'>
                              to Scott, Alex, Jennifer
                            </Typography>
                            {" — You've earned your first medal for this year…"}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar
                          alt='Cindy Baker'
                          src='https://res.cloudinary.com/paxers/image/upload/v1613566993/paxers-profile-images/whlgc2hky9qrgzsrw595.jpg'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Cindy Baker Like you activity'
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'>
                              Sandra Adams
                            </Typography>
                            {' — Check it out…'}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

export default Notifications;
