require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Your app is listening on port ' + process.env.PORT + '.\nhttp://localhost:' + process.env.PORT);
    });
}).catch((err) => {
    console.error('Connection to MongoDB failed: ' + err);
});

