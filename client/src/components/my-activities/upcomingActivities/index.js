import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//material ui
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgress } from '@material-ui/core';

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
            activity.event.distanceTypeIsKM ? ' km' : 'miles'
          }`,
          dateReserved: `${moment(activity.dateRegistered).format(
            'MMM DD, YYYY hh:mm a',
          )}`,
          nameOfEvent: `${activity.event.title}`,
          dateOfEvent: `${
            moment(activity.event.startDate).isSame(
              moment(activity.event.startDate),
              'days',
            )
              ? `${moment(activity.event.endDate).format('MMM DD, YYYY')}`
              : `${`${moment(activity.event.endDate).format(
                  'MMM DD, YYYY',
                )} - ${moment(activity.event.endDate).format('MMM DD, YYYY')}`}`
          }`,
          expirationDate: `${moment(activity.payment.timeToExpire).format(
            'MMM DD, YYYY hh:mm a',
          )}`,
          paymentMethod: `${activity.payment.payThrough}`,
          amountToPay: `₱ ${activity.payment.amountToPay}`,
          transactionId: `${activity.transactionId}`,
          paymentImage: `${activity.paymentImage}`,
          status: `${activity.status}`,
          link: `${process.env.REACT_APP_CLIENT_URL}/${charReplacer(
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
            <DataGrid
              scrollbarSize={40}
              hideFooterRowCount
              hideFooterSelectedRowCount
              onRowClick={({ row }) => setRowSelected(row)}
              rows={rows}
              columns={[
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
                { field: 'status', headerName: 'Status', sortable: true },
                {
                  field: 'link',
                  headerName: 'Link',
                  sortable: false,
                  width: 400,
                },
              ]}
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
