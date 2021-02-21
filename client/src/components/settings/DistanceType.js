import React, { useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import { setDistanceType, saveDistanceType } from '../../actions/user';

//material ui
import {} from '@material-ui/core';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core';

//icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';

const DistanceType = ({
  setDistanceType,
  saveDistanceType,
  user: { _id, preferredMeasurementIsMetric },
}) => {
  const timer = useRef();
  const [checked, setChecked] = React.useState(
    preferredMeasurementIsMetric ? true : false,
  );

  const handleToggle = () => {
    setChecked(!checked);
    setDistanceType(!checked ? true : false);
    clearTimeout(timer.current); // to reset timer every after changes for specific seconds to save read/write to DB
    timer.current = window.setTimeout(() => {
      saveDistanceType(!checked ? true : false, _id);
    }, 7000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Fragment>
      <ListItem>
        <ListItemIcon>
          <DirectionsRunOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={`Distance Type is ${checked ? 'Kilometer' : 'Miles'}`}
        />
        <ListItemSecondaryAction>
          <Switch
            edge='end'
            onChange={handleToggle}
            checked={checked}
            inputProps={{
              'aria-labelledby': 'switch-list-label-distance-type',
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

DistanceType.propTypes = {
  saveDistanceType: PropTypes.func,
  setDistanceType: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setDistanceType, saveDistanceType })(
  DistanceType,
);
