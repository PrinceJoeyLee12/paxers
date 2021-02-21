import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { Box } from '@material-ui/core';

//Components
import Overview from './PanelViews/Overview';
import CategoriesPanel from './PanelViews/CategoriesPanel';
import RaceKits from './PanelViews/RaceKits';
import Prizes from './PanelViews/Prizes';
import ContactInfo from './PanelViews/ContactInfo';
import MapRoutes from './PanelViews/MapRoutes';
import PaymentOptions from './PanelViews/PaymentOptions';
import Medals from './PanelViews/Medals';
const TabPanel = ({ value, index, tabLabel, ...other }) => {
  const render = () => {
    switch (tabLabel.toLowerCase()) {
      case 'overview':
        return <Overview />;
      case 'categories':
        return <CategoriesPanel />;
      case 'race kits':
        return <RaceKits />;
      case 'prizes':
        return <Prizes />;
      case 'contact info':
        return <ContactInfo />;
      case 'routes':
        return <MapRoutes />;
      case 'payment options':
        return <PaymentOptions />;
      case 'medals':
        return <Medals />;
      default:
        return '';
    }
  };

  return (
    <>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}>
        {value === index && <Box p={3}>{render}</Box>}
      </div>
    </>
  );
};
TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
