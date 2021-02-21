import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//components
import ActivityRow from './ActivityRow';

// actions
import { getRecentActivities } from '../../../actions/activity';

//Material UI styles and Icons
import {
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
  TableCell,
  CircularProgress,
} from '@material-ui/core';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const RecentActivities = ({
  user: { _id },
  activity: { recentActivities },
  getRecentActivities,
}) => {
  const [readyToView, setReadyToView] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (Array.isArray(recentActivities) && recentActivities.length === 0) {
      getRecentActivities(_id, handleStatus);
    } else {
      setReadyToView(true);
    }
  }, [getRecentActivities, _id, recentActivities]);

  const handleStatus = status => {
    setStatus(status === '200' ? true : false);
  };

  return (
    <Fragment>
      {readyToView ? (
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell>{`Distance`}</TableCell>
                <TableCell align='left'>Elapse Time</TableCell>
                <TableCell align='left'>{`Average Pace`}</TableCell>
                <TableCell align='left'>{`Fastest Pace`}</TableCell>
                <TableCell align='left'>Average HR (bpm)</TableCell>
                <TableCell align='left'>Total Calories Burned</TableCell>
                <TableCell align='left'>Average Elevation (ft)</TableCell>
                <TableCell align='left'>Max Elevation (ft)</TableCell>
                <TableCell align='left'>Average Cadence (spm)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ActivityRow activities={recentActivities} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : status ? (
        <RenderFallbackOption>
          You don't have any recent activity yet. Go create one!
        </RenderFallbackOption>
      ) : (
        <RenderFallbackOption>
          <CircularProgress component='div' />
        </RenderFallbackOption>
      )}
    </Fragment>
  );
};

RecentActivities.propTypes = {
  getRecentActivities: PropTypes.func,
};

const mapStateToProps = state => ({
  activity: state.activity,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getRecentActivities })(
  RecentActivities,
);
