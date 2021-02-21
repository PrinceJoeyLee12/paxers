import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// functions
import { getEvent, setLoading } from '../../actions/event';

//components
import MainImage from './MainImage';
import Organizer from './Organizer';
import EventNavigations from './EventNavigations/';
import RegistrationButton from './RegistrationButton';

//material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
}));

const Event = ({ match, event: { loading, event }, getEvent, setLoading }) => {
  const classes = useStyles();

  const {
    title,
    displayImg,
    description,
    organizerAvatar,
    organizerId,
    categories,
    registrationEnd,
  } = event;

  useEffect(() => {
    if (Object.keys(event).length === 0 || event._id !== match.params.id) {
      getEvent(match.params.id);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [getEvent, match.params.id, event._id, event]);

  return (
    <Fragment>
      {loading ? (
        <div style={{ paddingTop: '50px', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Card className={classes.root}>
            <MainImage image={displayImg} />
            <CardContent>
              <Organizer
                organizerAvatar={organizerAvatar}
                organizerId={organizerId}
              />
              <Typography
                gutterBottom
                variant='h5'
                component='h2'
                style={{ textAlign: '-webkit-center', marginTop: '10px' }}>
                {title}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                style={{ textAlign: 'center', paddingBottom: '10px' }}>
                {description}
              </Typography>
            </CardContent>
            <RegistrationButton
              title={match.params.title}
              id={match.params.id}
              categories={categories}
              registrationEnd={registrationEnd}
            />
            <EventNavigations />
          </Card>
        </>
      )}
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func,
  setLoading: PropTypes.func,
  event: PropTypes.object,
};

const mapStateToProps = state => ({
  event: state.event,
});
export default connect(mapStateToProps, { getEvent, setLoading })(
  withRouter(Event),
);
