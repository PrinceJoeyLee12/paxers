const express = require('express');
const app = express();

//All Routes
app.use('/auth', require('./auth'));
app.use('/user', require('./users'));
app.use('/event', require('./event'));
app.use('/events', require('./event'));
app.use('/form', require('./form'));
app.use('/registrants', require('./registrants'));
app.use('/contact-us', require('./contactUs'));
app.use('/activity', require('./activities'));

module.exports = app;
