import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

//Components
import Header from './Header';
import DisplayImage from './DisplayImage';
import Organizer from './Organizer';
import InitialInfo from './InitialInfo';
import Likes from './Likes';
import DropdownInfo from './DropdownInfo';

//utils
import { charReplacer } from '../../../utils/textFormater';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

import {
  CardActionArea,
  Card,
  IconButton,
  CardContent,
  CardActions,
  Collapse,
  Grid,
} from '@material-ui/core';

//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    minWidth: 365,
    textAlign: 'start',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 320,
      minWidth: 250,
    },
    '& .MuiCardHeader-title': {
      color: '#000',
    },
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const EventInitialView = ({
  event: {
    _id,
    organizerAvatar,
    title,
    displayImg,
    likes,
    eventLocation,
    startDate,
    endDate,
    isVirtual,
    categories,
    distanceTypeIsKM,
    registrationStart,
    registrationEnd,
    eventImgs,
    description,
    createAt,
  },
  history,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [urlTitle, setUrlTitle] = useState(null);

  const handleExpand = panel => () => {
    expanded === panel ? setExpanded(false) : setExpanded(panel);
  };

  useEffect(() => {
    setUrlTitle(charReplacer(title, ' ', '-'));
  }, [setUrlTitle, title]);

  return (
    <Fragment>
      <Grid item style={{ padding: '12px' }}>
        <Card className={classes.root}>
          <Link
            to={`/event/${urlTitle}/${_id}`}
            history={history}
            style={{ textDecoration: 'none' }}>
            <CardActionArea>
              <Header title={title} startDate={startDate} endDate={endDate} />
            </CardActionArea>
            <CardActionArea style={{ position: 'relative' }}>
              <DisplayImage
                displayImg={displayImg}
                title={title}
                isVirtual={isVirtual}
              />
            </CardActionArea>
          </Link>
          <Organizer organizerAvatar={organizerAvatar} />
          <CardActionArea onClick={handleExpand(_id)}>
            <CardContent>
              <InitialInfo
                registrationEnd={registrationEnd}
                eventLocation={eventLocation}
                categories={categories}
                distanceTypeIsKM={distanceTypeIsKM}
              />
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            <Likes _id={_id} likes={likes} />
            <IconButton
              className={classnames(classes.expand, {
                // [classes.expandOpen]: expanded,
                [classes.expandOpen]: expanded === _id,
              })}
              onClick={handleExpand(_id)}
              aria-expanded={expanded}
              aria-label='show more'>
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          {/* <Collapse in={expanded} timeout='auto' unmountOnExit> */}
          <Collapse in={expanded === _id} timeout='auto' unmountOnExit>
            <CardContent>
              <DropdownInfo
                eventImgs={eventImgs}
                description={description}
                eventId={_id}
                eventTitle={urlTitle}
                registrationEnd={registrationEnd}
                categories={categories}
              />
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default withRouter(EventInitialView);
