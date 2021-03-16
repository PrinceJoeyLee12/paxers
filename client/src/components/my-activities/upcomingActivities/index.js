import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//utils
import { distanceTypeIsNumber } from '../../../utils/numberFormater';

//material ui
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { CircularProgress, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import {
  XCircle as XCircleIcon,
  CheckCircle as CheckCircleIcon,
} from 'react-feather';

//actions
import {
  getUpcomingActivities,
  setRowSelected,
  setChanges,
} from '../../../actions/activity';

//utils
import { charReplacer } from '../../../utils/textFormater';

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const useStyles = makeStyles(theme => ({
  registrationStatusOpen: {
    borderColor: 'green',
    backgroundColor: 'rgb(0,255,0,0.1)',
  },
  registrationStatusClose: {
    borderColor: 'red',
    backgroundColor: 'rgb(255,0,0,0.1)',
  },
  inReviewStatus: {
    borderColor: 'blue',
    backgroundColor: 'rgb(0,0,255,0.1)',
  },
}));

const UpcomingActivities = ({
  activity: { upcomingActivities, isThereAChanges },
  getUpcomingActivities,
  setRowSelected,
  user,
  setChanges,
}) => {
  const [readyToView, setReadyToView] = useState(false);
  const [status, setStatus] = useState(false);
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const handleStatus = status => {
    setStatus(status === '200' ? true : false);
  };

  useEffect(() => {
    if (
      upcomingActivities &&
      upcomingActivities.length &&
      upcomingActivities.length !== 0
    ) {
      let _rows = [];
      upcomingActivities.forEach((activity, index) => {
        _rows.push({
          id: activity._id,
          no: index + 1,
          distance: `${activity.data.categorySelected} ${
            distanceTypeIsNumber(activity.data.categorySelected)
              ? activity.event.distanceTypeIsKM
                ? ' km'
                : 'miles'
              : ''
          }`,
          dateReserved: `${moment(activity.dateRegistered).format(
            'MMM DD YYYY hh:mm a',
          )}`,
          nameOfEvent: `${activity.event.title}`,
          dateOfEvent: `${
            moment(activity.event.startDate).isSame(
              moment(activity.event.startDate),
              'days',
            )
              ? `${moment(activity.event.endDate).format('MMM DD YYYY')}`
              : `${`${moment(activity.event.endDate).format(
                  'MMM DD YYYY',
                )} - ${moment(activity.event.endDate).format('MMM DD YYYY')}`}`
          }`,
          expirationDate: `${moment(activity.payment.timeToExpire).format(
            'MMM DD YYYY hh:mm a',
          )}`,
          paymentMethod: `${activity.payment.payThrough}`,
          amountToPay: `₱ ${activity.payment.amountToPay}`,
          transactionId: `${activity.transactionId}`,
          paymentImage: `${activity.paymentImage}`,
          status: `${activity.status}`,
          link: `${window.location.origin}/${charReplacer(
            activity.event.title,
            ' ',
            '-',
          ).toLowerCase()}/registration/${activity.userId}/${
            activity.transactionId
          }`,
        });
      });
      setRows(_rows);
      setChanges(false);
      setReadyToView(true);
    } else {
      getUpcomingActivities(user._id, handleStatus);
    }
    // eslint-disable-next-line
  }, [user._id, setChanges, upcomingActivities]);

  const columns = [
    {
      field: 'no',
      headerName: 'No',
      sortable: false,
      width: 60,
      disableColumnMenu: true,
    },
    {
      field: 'distance',
      headerName: 'Distance',
      sortable: false,
      width: 100,
    },
    {
      field: 'dateReserved',
      headerName: 'Date Reserved',
      sortable: false,
      width: 200,
    },
    {
      field: 'nameOfEvent',
      headerName: 'Name of Event',
      sortable: false,
      width: 200,
    },
    {
      field: 'dateOfEvent',
      headerName: 'Date of Event',
      sortable: false,
      width: 190,
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      sortable: false,
      width: 190,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      sortable: false,
      width: 150,
    },
    {
      field: 'amountToPay',
      headerName: 'Amount To Pay',
      sortable: false,
    },
    {
      field: 'transactionId',
      headerName: 'Transaction Id',
      sortable: false,
      width: 190,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      renderCell: params => (
        <strong>
          <Chip
            size='small'
            variant='outlined'
            className={
              params.value === 'paid'
                ? classes.registrationStatusOpen
                : params.value === 'unpaid'
                ? classes.registrationStatusClose
                : classes.inReviewStatus
            }
            avatar={
              params.value === 'paid' ? (
                <CheckCircleIcon />
              ) : params.value === 'unpaid' ? (
                <XCircleIcon />
              ) : (
                <ErrorOutlineOutlinedIcon color='primary' />
              )
            }
            label={params.value}
          />
        </strong>
      ),
      width: 130,
    },
    {
      field: 'link',
      headerName: 'Link',
      sortable: false,
      width: 400,
    },
  ];

  useEffect(() => {
    if (isThereAChanges) {
      setReadyToView(false);
      getUpcomingActivities(user._id, handleStatus);
    }
  }, [isThereAChanges, getUpcomingActivities, user._id]);

  return (
    <>
      {readyToView ? (
        <Fragment>
          <div style={{ height: 500, width: '100%', marginTop: '10px' }}>
            (Click on any row below to show data)
            <DataGrid
              columns={columns}
              rows={rows}
              disableColumnSelector={false}
              scrollbarSize={40}
              hideFooterRowCount
              hideFooterSelectedRowCount
              onRowClick={({ row }) => setRowSelected(row)}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </Fragment>
      ) : status ? (
        <RenderFallbackOption>
          You don't have any recent activity yet. Go create one!
        </RenderFallbackOption>
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </>
  );
};
UpcomingActivities.propTypes = {
  getUpcomingActivities: PropTypes.func,
  setRowSelected: PropTypes.func,
  setChanges: PropTypes.func,
};

const mapStateToProps = state => ({
  activity: state.activity,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getUpcomingActivities,
  setRowSelected,
  setChanges,
})(UpcomingActivities);
