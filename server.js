const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const passport = require('passport');

//Configure Config Files
/*
 * if you're cloning this app make sure to make a "config.env" file in root/config
 * and have all your global variables there
 */
if (process.env.NODE_ENV === 'development')
  dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

//Initialize Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport config
require('./config/passport')(passport);

// Logging if in development
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    }),
  );
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  // force to redirect https
  app.use(function (req, res, next) {
    if (req.get('X-Forwarded-Proto') !== 'https') {
      res.redirect('https://' + req.get('Host') + req.url);
    } else next();
  });
}

// api routes
app.use('/api', require('./routes/api/index'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is in ${process.env.NODE_ENV} running in PORT ${PORT}`),
);
