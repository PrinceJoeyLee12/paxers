import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Pages
import PrivateRoute from './PrivateRoute';
import Landing from '../layouts/Landing';
import ThankYouPage from '../layouts/ThankYouPage';
import ContactUs from '../ContactUs';
import Dashboard from '../dashboard/Dashboard';
import TokenPage from '../layouts/TokenPage';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Event from '../event';
import NotFound from '../layouts/NotFound';
import EventForm from '../form';
import CreateEvent from '../create-event';
import Payment from '../payment';
import MyCalendar from '../my-calendar';
import MyRacesAndActivities from '../my-activities';
import PaymentDetails from '../paymentDetails';
import Settings from '../settings';
import Account from '../account';

//Material UI styling
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: 0,

    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

const Routes = props => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <section className='container'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/event/:title/:id' component={Event} />
          <Route exact path='/auth/:token' component={TokenPage} />
          <Route exact path='/contact-us' component={ContactUs} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/form/:title/:id' component={EventForm} />
          <PrivateRoute exact path='/payment/:title/:id' component={Payment} />
          <PrivateRoute exact path='/my-calendar' component={MyCalendar} />
          <PrivateRoute
            exact
            path='/my-activities'
            component={MyRacesAndActivities}
          />
          <Route
            exact
            path='/:title/registration/:userId/:transactionId'
            component={PaymentDetails}
          />
          <PrivateRoute exact path='/settings' component={Settings} />
          <PrivateRoute exact path='/account/me' component={Account} />
          <Route exact path='/create-event' component={CreateEvent} />
          <PrivateRoute
            exact
            path='/form/:title/:id/:distance'
            component={EventForm}
          />
          <Route
            exact
            path='/reset-password/:token'
            component={ResetPassword}
          />
          <Route
            exact
            path='/successful-reservation'
            component={ThankYouPage}
          />
          <Route component={NotFound} />
        </Switch>
      </section>
    </div>
  );
};

export default Routes;
