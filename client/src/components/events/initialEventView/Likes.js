import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Material Ui
import { IconButton, Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

//icons
import { Heart as FavoriteIcon } from 'react-feather';

//utils
import { toast } from 'react-toastify';

//actions
import { addRemoveLike } from '../../../actions/event';

//Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  likeAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  liked: {
    color: 'red',
  },
  notLiked: {
    color: 'grey',
  },
}));
const Likes = ({
  _id,
  likes,
  auth: { isAuthenticated, user },
  addRemoveLike,
}) => {
  const classes = useStyles();

  //State
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated) {
      if (
        likes.some(({ _id }) =>
          _id === undefined ? false : _id.toString() === user._id,
        )
      ) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [likes, user, isAuthenticated]);

  const errMessage = msg => {
    toast.error(`${msg}`);
  };
  return (
    <>
      <IconButton
        aria-label='add to favorites'
        onClick={() => {
          !isAuthenticated
            ? toast.error("You are'nt login please Login first")
            : !user._id
            ? toast.error('Client-side error please Login back')
            : addRemoveLike(_id, errMessage, user.image);
        }}>
        <FavoriteIcon
          className={
            isLiked && isAuthenticated ? classes.liked : classes.notLiked
          }
        />
      </IconButton>
      <AvatarGroup max={4} spacing='small'>
        {likes.map((like, index) => (
          <span key={index} style={{ borderWidth: '0px' }}>
            <Avatar
              alt={like.name}
              src={like.avatar}
              className={classes.likeAvatar}></Avatar>
          </span>
        ))}
      </AvatarGroup>
    </>
  );
};

Likes.propTypes = {
  isAuthenticated: PropTypes.bool,
  addRemoveLike: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addRemoveLike })(Likes);
