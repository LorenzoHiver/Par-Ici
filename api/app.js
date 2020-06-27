require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./app/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router)

module.exports = app;
