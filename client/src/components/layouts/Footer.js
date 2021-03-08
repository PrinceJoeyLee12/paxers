import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Footer() {
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      align='center'
      style={{ marginTop: '50px', marginBottom: '50px' }}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        {process.env.REACT_APP_BRAND_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
