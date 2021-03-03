import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//utils
import setAuthToken from '../../utils/setAuthToken';

//material UI
import { CircularProgress, Typography } from '@material-ui/core';
import { loadUser } from '../../actions/auth';

const TokenPage = ({
  match,
  history,
  loadUser,
  user: { _id, isAuthenticated },
}) => {
  useEffect(() => {
    setAuthToken(match.params.token.trim());
  });

  useEffect(() => {
    if (!(_id || isAuthenticated)) {
      loadUser();
    } else {
      history.push('/');
    }
  }, [_id, isAuthenticated, loadUser, history]);

  return (
    <div style={{ paddingTop: '50px', textAlign: 'center' }}>
      <CircularProgress />
      <div style={{ paddingTop: '20px', textAlign: 'center' }}>
        <Typography variant='h4'> Please wait...</Typography>
      </div>
    </div>
  );
};

TokenPage.propTypes = {
  loadUser: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(TokenPage);
