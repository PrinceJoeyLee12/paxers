import React, { Fragment, useState, Suspense } from 'react';
import { withRouter } from 'react-router-dom';

//Material UI
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Drawer,
  Hidden,
  CircularProgress,
} from '@material-ui/core';

//Icons
import MenuIcon from '@material-ui/icons/Menu';

//components
import LogoRender from './LogoRender';
const SidebarSettings = React.lazy(() => import('./SidebarSetting'));
const AppbarSettings = React.lazy(() => import('./AppbarMenus'));

//Styling
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerMenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  badge: {
    variant: 'dot',
    overlap: 'circle',
    [theme.breakpoints.down('sm')]: {
      variant: 'dot',
    },
  },
  hide: {
    visibility: false,
  },
  show: {
    visibility: true,
  },
}));

const Navbar = ({ window }) => {
  const classes = useStyles();

  //Utilities
  const theme = useTheme();

  //Sidebar Settings
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <div className={classes.grow}>
        <Suspense
          fallback={
            <div style={{ paddingTop: '50px', textAlign: 'center' }}>
              <CircularProgress />
            </div>
          }>
          <CssBaseline />
          <AppBar position='static' className={classes.appBar}>
            <LogoRender />
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                className={classes.drawerMenuButton}>
                <MenuIcon className={classes.icons} />
              </IconButton>
              <nav className={classes.drawer} aria-label='mailbox folders'>
                <Hidden smUp implementation='css'>
                  <Drawer
                    container={container}
                    variant='temporary'
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={sidebarOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}>
                    <SidebarSettings handleDrawerToggle={handleDrawerToggle} />
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation='css'>
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant='permanent'
                    open={sidebarOpen}>
                    <SidebarSettings handleDrawerToggle={handleDrawerToggle} />
                  </Drawer>
                </Hidden>
              </nav>
              <AppbarSettings />
            </Toolbar>
          </AppBar>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default withRouter(Navbar);
