/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including websites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const indexRouter = require('./routes/index.routes');
const swaggerUi = require("swagger-ui-express");
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const propertiesRouter = require('./routes/properties.routes');
const bookingsRouter = require('./routes/bookings.routes');
const validRouter = require('./routes/valid.routes');

const app = express();


app.use(cors());
app.use(require("./middleware/morgan.middleware"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static('public'));

app.use('/', swaggerUi.serve, indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/properties', propertiesRouter);
app.use('/bookings', bookingsRouter);
app.use('/valid', validRouter);

//404 error handler
app.use((req, res) => {
    res.status(404).json({
        message: '404 - Not Found',
    });
});
/** Connect to MongoDB and start server */
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Your app is listening on port ' + process.env.PORT + '.\nhttp://localhost:' + process.env.PORT);
    });
}).catch((err) => {
    console.error('Connection to MongoDB failed: ' + err);
});

