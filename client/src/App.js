import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/navbar';

//Components
import Routes from './components/routing/Routes.js';
import AlertDialog from './components/layouts/AlertDialog';
import FullScreenDialog from './components/layouts/FullScreenDialog';
import BackdropLoading from './components/layouts/BackdropLoading';
import 'react-toastify/dist/ReactToastify.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    //Logout user out from all tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AlertDialog style={{ marginLeft: '50px' }} />
        <FullScreenDialog />
        <BackdropLoading />
        <Navbar />
        <Fragment>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
