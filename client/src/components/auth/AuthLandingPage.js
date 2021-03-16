import React, { Suspense, lazy } from 'react';

const ForgotPassword = lazy(() => import('./ForgotPassword'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const ResetPassword = lazy(() => import('./ResetPassword'));

const AuthLandingPage = ({ match }) => {
  return (
    <>
      <Suspense fallback='Loading...'>
        {match.url === '/login' ? (
          <Login />
        ) : match.url === '/forgot-password' ? (
          <ForgotPassword />
        ) : match.url === '/register' ? (
          <Register />
        ) : (
          <ResetPassword />
        )}
      </Suspense>
    </>
  );
};

export default AuthLandingPage;
