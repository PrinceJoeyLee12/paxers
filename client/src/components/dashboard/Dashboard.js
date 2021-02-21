import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Dashboard = ({ logout }) => {
  // if (
  //   localStorage.getItem('prevPath') !== undefined &&
  //   localStorage.getItem('prevPath') !== ''
  // )
  //   return <Redirect to={localStorage.getItem('prevPath')} />;
  return (
    <div>
      <h1> This is Dashboard</h1>
      <div className='btn btn-dark text-light'>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func,
};

export default connect(null, { logout })(Dashboard);
