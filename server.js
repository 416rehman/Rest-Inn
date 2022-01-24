require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

app.use(require("./middleware/morgan.middlware"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);


/** Connect to MongoDB and start server */
mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Your app is listening on port ' + process.env.PORT + '.\nhttp://localhost:' + process.env.PORT);
    });
}).catch((err) => {
    console.error('Connection to MongoDB failed: ' + err);
});

