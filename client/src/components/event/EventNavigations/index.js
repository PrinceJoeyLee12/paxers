import React from 'react';

// components
import TabPanel from './TabPanel';

//material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  Typography,
  AppBar,
  useMediaQuery,
} from '@material-ui/core';

const siteTabs = [
  { tabLabel: 'Overview' },
  { tabLabel: 'Categories' },
  { tabLabel: 'Medals' },
  { tabLabel: 'Race Kits' },
  { tabLabel: 'Prizes' },
  { tabLabel: 'Payment Options' },
  { tabLabel: 'Contact Info' },
  { tabLabel: 'Routes' },
];

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    //  backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    position: '-webkit-sticky',
    backgroundColor: 'secondary',
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();

  const isMobile = useMediaQuery('(max-width:600px)');

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='sticky' className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={isMobile ? 'off' : 'auto'}
          aria-label='scrollable prevent tabs example'>
          {siteTabs.length !== 0 &&
            siteTabs.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Typography variant='subtitle1'>{tab.tabLabel}</Typography>
                }
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
      </AppBar>
      <div style={{ padding: '20px', marginTop: '20px' }}>
        {siteTabs.length !== 0 &&
          siteTabs.map((tab, index) => (
            <TabPanel
              key={index}
              value={value}
              index={index}
              tabLabel={tab.tabLabel}
            />
          ))}
      </div>
    </div>
  );
}
