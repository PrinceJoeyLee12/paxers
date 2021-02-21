import React, { Fragment } from 'react';

//Utils
import { convertToTimeFormat } from '../../../utils/numberFormater';

//Material UI styles and Icons
import {
  Box,
  Collapse,
  Table,
  TableRow,
  Typography,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';

const ActivitySplits = ({
  splits,
  open,
  measurementUsedIsMetric,
  title,
  place,
}) => {
  return (
    <Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Splits
              </Typography>
              <Typography variant='body1' component='div'>
                {title}
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                color='textPrimary'
                component='div'>
                {place}
              </Typography>
              <Table size='small' aria-label='splits'>
                <TableHead>
                  <TableRow>
                    <TableCell>Distance</TableCell>
                    <TableCell>Cumulative Time</TableCell>
                    <TableCell>Average Pace</TableCell>
                    <TableCell>Fastest Pace</TableCell>
                    <TableCell>Average HR</TableCell>
                    <TableCell>Calories Burned</TableCell>
                    <TableCell>Average Elevation</TableCell>
                    <TableCell>Average Cadence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {splits.map((split, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {`${split.distance}${
                          measurementUsedIsMetric ? ' km' : ' miles'
                        }`}
                      </TableCell>
                      <TableCell>
                        {convertToTimeFormat(split.cumulativeTime)}
                      </TableCell>
                      <TableCell>
                        {`${convertToTimeFormat(split.fastestPace)}${
                          index === 0
                            ? measurementUsedIsMetric
                              ? ' /km'
                              : ' /mile'
                            : ''
                        }`}
                      </TableCell>
                      <TableCell>
                        {`${convertToTimeFormat(split.averagePace)}${
                          index === 0
                            ? measurementUsedIsMetric
                              ? ' /km'
                              : ' /mile'
                            : ''
                        }`}
                      </TableCell>
                      <TableCell align='left'>{split.averageHr}</TableCell>
                      <TableCell align='left'>{split.caloriesBurned}</TableCell>
                      <TableCell align='left'>
                        {split.averageElevation}
                      </TableCell>
                      <TableCell align='left'>{split.averageCadence}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default ActivitySplits;
