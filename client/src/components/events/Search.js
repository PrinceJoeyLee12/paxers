import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import EventInitialView from './initialEventView';

//functions
import { getEventsTitles } from '../../actions/search';
import {
  getEventByTitle,
  setLoading,
  setShowEvent,
  clearEvent,
} from '../../actions/event';

//Material UI
import { TextField, CircularProgress, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Custom Styling with Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  searchBar: {
    maxWidth: 800,
    minWidth: 360,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 620,
      minWidth: 250,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Search = ({
  event: { event, events, loading, showEvent, titles },
  getEventByTitle,
  setLoading,
  setShowEvent,
  clearEvent,
  getEventsTitles,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selected, setSelected] = React.useState(options[0]);
  const isLoading = open && options.length === 0;

  //classes
  const classes = useStyles();

  useEffect(() => {
    let active = true;

    if (!isLoading) {
      return undefined;
    }
    if (titles.length === 0) getEventsTitles();
    if (active) {
      setOptions(titles.map((data, key) => data.title));
    }

    return () => {
      active = false;
    };
  }, [isLoading, getEventsTitles, titles]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (selected !== null && selected !== undefined) {
      if (selected !== event.title) {
        clearEvent();
        getEventByTitle(selected);
      }
      setShowEvent(true);
    } else {
      setShowEvent(false);
      setLoading(false);
    }
  }, [
    selected,
    getEventByTitle,
    setLoading,
    showEvent,
    events.length,
    setShowEvent,
    clearEvent,
    event.title,
  ]);

  const handleChange = () => {
    // console.log(value);
  };

  return (
    <div>
      <Autocomplete
        id='asynchronous-demo'
        className={classes.searchBar}
        size='small'
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={option => option}
        options={options}
        loading={isLoading}
        renderInput={params => (
          <TextField
            {...params}
            label='Search Event'
            variant='outlined'
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <div>
        {selected !== null && showEvent ? (
          Object.keys(event).length !== 0 ? (
            <Fragment>
              <div className={classes.content}>
                <Grid
                  container
                  spacing={3}
                  justify='center'
                  alignItems='flex-start'>
                  <EventInitialView key={event._id} event={event} />
                </Grid>
              </div>
            </Fragment>
          ) : null
        ) : null}
      </div>
      {!loading ? (
        ''
      ) : (
        <div style={{ paddingTop: '50px', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  event: PropTypes.object,
  events: PropTypes.array,
  titles: PropTypes.array,
  getEventByTitle: PropTypes.func,
  setShowEvent: PropTypes.func,
  clearEvent: PropTypes.func,
  setLoading: PropTypes.func,
  getEventsTitles: PropTypes.func,
  loading: PropTypes.bool,
  showEvent: PropTypes.bool,
};

const mapStateToProps = state => ({
  event: state.event,
});

export default connect(mapStateToProps, {
  getEventByTitle,
  setLoading,
  setShowEvent,
  clearEvent,
  getEventsTitles,
})(Search);
