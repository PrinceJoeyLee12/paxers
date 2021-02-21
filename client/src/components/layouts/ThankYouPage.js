import React, { Fragment } from 'react';

const ThankYouPage = () => {
  return (
    <Fragment>
      <div className='jumbotron text-center'>
        <h1 className='display-3'>Thank You!</h1>
        <p className='lead'>
          <strong>Please check your email</strong> for further instructions on
          how to complete your account setup.
        </p>
        <hr />
        <p>
          Having trouble? <a href='/contact-us'>Contact us</a>
        </p>
        <p className='lead'>
          <a className='btn btn-primary btn-sm' href='/' role='button'>
            Continue to homepage
          </a>
        </p>
      </div>
    </Fragment>
  );
};

export default ThankYouPage;
