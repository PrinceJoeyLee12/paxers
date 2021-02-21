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
                          alt='Remy Sharp'
                          src='/static/images/avatar/1.jpg'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Brunch this weekend?'
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
                              " — I'll be in your neighborhood doing errands this…"
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar
                          alt='Travis Howard'
                          src='/static/images/avatar/2.jpg'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Summer BBQ'
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'>
                              to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar
                          alt='Cindy Baker'
                          src='/static/images/avatar/3.jpg'
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary='Oui Oui'
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'>
                              Sandra Adams
                            </Typography>
                            {
                              ' — Do you have Paris recommendations? Have you ever…'
                            }
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
