const {bookingStatus} = require("../constants/booking.constants");
const Joi = require("joi").extend(require("@hapi/joi-date"));
const {usernameCondition} = require('./user-validation');

const propertyCondition = Joi.string().regex(/^[a-f\d]{24}$/i).label('Listing Id')
const checkInCondition = Joi.date().format('DD-MM-YYYY').label('Check In Date')
const checkOutCondition = Joi.date().format('DD-MM-YYYY').label('Check Out Date')
const guestsCondition = Joi.number().min(1).label('Guests')
const priceCondition = Joi.number().min(0).label('Price')
const statusCondition = Joi.string().valid(bookingStatus).label('Status')

const newBookingSchema = Joi.object({
    user: usernameCondition,
    property: propertyCondition.required(),
    checkIn: checkInCondition.required(),
    checkOut: checkOutCondition.required(),
    guests: guestsCondition.required(),
    price: priceCondition.required(),
    status: statusCondition
})

const ExistingBookingSchema = Joi.object({
    user: usernameCondition,
    property: propertyCondition,
    checkIn: checkInCondition,
    checkOut: checkOutCondition,
    guests: guestsCondition,
    price: priceCondition,
    status: statusCondition
})

module.exports = {
    newBookingSchema,
    ExistingBookingSchema
}