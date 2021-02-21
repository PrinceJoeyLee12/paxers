import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

//components
import RecentActivities from './recentActivities';
import UpcomingActivities from './upcomingActivities';
// import PersonalRecords from './personalRecords';

//Material ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: '20px',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          color='textPrimary'
          variant='fullWidth'
          aria-label='full width tabs example'>
          <Tab label='Recent Activities' {...a11yProps(0)} />
          <Tab label='Upcoming Races' {...a11yProps(1)} />
          {/* <Tab label='Upcoming Races' {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <RecentActivities />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UpcomingActivities />
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          <PersonalRecords />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}
