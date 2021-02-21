import React, { useState, Fragment } from 'react';
import moment from 'moment';

//components
import ActivitySplits from './ActivitySplits';

//utils
import { convertToTimeFormat } from '../../../utils/numberFormater';

//Material UI styleas and Icons
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const ActivityRow = ({ activities }) => {
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);

  const handleExpand = panel => {
    open === panel ? setOpen(false) : setOpen(panel);
  };

  return (
    <Fragment>
      {activities &&
        activities.map((activity, index) => (
          <Fragment key={index}>
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => handleExpand(activity._id)}>
                  {open === activity._id ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell component='th' scope='row'>
                {moment(activity.dateActivityPerformed).format('MMM-DD-YYYY')}
              </TableCell>
              <TableCell align='left'>{`${activity.totalDistance}${
                activity.measurementUsedIsMetric ? ' km' : ' miles'
              }`}</TableCell>
              <TableCell align='left'>
                {convertToTimeFormat(activity.totalTime)}
              </TableCell>
              <TableCell align='left'>
                {`${convertToTimeFormat(activity.paceAverage)}${
                  activity.measurementUsedIsMetric ? ' /km' : ' /mile'
                }`}
              </TableCell>
              <TableCell align='left'>
                {`${convertToTimeFormat(activity.fastestPace)}${
                  activity.measurementUsedIsMetric ? ' /km' : ' /mile'
                }`}
              </TableCell>
              <TableCell align='left'>{activity.hrAverage}</TableCell>
              <TableCell align='left'>{activity.totalCaloriesBurned}</TableCell>
              <TableCell align='left'>{activity.elevationAverage}</TableCell>
              <TableCell align='left'>{activity.maxElevation}</TableCell>
              <TableCell align='left'>{activity.averageCadence}</TableCell>
            </TableRow>
            <ActivitySplits
              splits={activity.splits}
              open={open === activity._id}
              measurementUsedIsMetric={activity.measurementUsedIsMetric}
              title={activity.titleOfActivity}
              place={activity.placeOfActivity}
            />
          </Fragment>
        ))}
    </Fragment>
  );
};

// ActivityRow.propTypes = {
//   activities: PropTypes.array(
//     PropTypes.shape({
//       titleOfActivity: PropTypes.string.isRequired,
//       placeOfActivity: PropTypes.string.isRequired,
//       paceAverage: PropTypes.string.isRequired,
//       fastestPace: PropTypes.string.isRequired,
//       hrAverage: PropTypes.number.isRequired,
//       totalTime: PropTypes.string.isRequired,
//       totalDistance: PropTypes.number.isRequired,
//       totalCaloriesBurned: PropTypes.number.isRequired,
//       elevationAverage: PropTypes.number.isRequired,
//       maxElevation: PropTypes.number.isRequired,
//       averageCadence: PropTypes.number.isRequired,
//       measurementUsedIsMetric: PropTypes.bool.isRequired,
//       splits: PropTypes.array.isRequired,
//       dateActivityPerformed: PropTypes.instanceOf(Date).isRequired,
//     }),
//   ).isRequired,
// };

export default ActivityRow;
