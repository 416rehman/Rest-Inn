const {bookingStatus} = require("../constants/booking.constants");
const Joi = require("joi").extend(require("@hapi/joi-date"));
const {usernameCondition} = require('./user-validation');

const propertyCondition = Joi.string().regex(/^[a-f\d]{24}$/i).label('Listing Id')
const checkInCondition = Joi.date().label('Check In Date (i.e 2022-03-02T19:17:29.000Z)')
const checkOutCondition = Joi.date().label('Check Out Date (i.e 2022-03-02T19:17:29.000Z)')
const adultsCondition = Joi.number().min(1).max(25).label('Number of Adults')
const childrenCondition = Joi.number().min(0).max(25).label('Number of Children')
const infantsCondition = Joi.number().min(0).max(25).label('Number of Infants')
const petsCondition = Joi.number().min(0).max(25).label('Number of Pets')
const guestsCondition = Joi.object().keys({
    adults: adultsCondition,
    children: childrenCondition,
    infants: infantsCondition,
    pets: petsCondition
}).label('Guests')
const priceCondition = Joi.number().min(0).label('Price')
const statusCondition = Joi.string().valid(...bookingStatus).label('Status')
const ratingCondition = Joi.number().min(0).max(5).label('Rating')
const reviewCondition = Joi.string().max(255).label('Review')

const newBookingSchema = Joi.object().keys({
    property: propertyCondition.label('property').required(),
    checkIn: checkInCondition.required(),
    checkOut: checkOutCondition.required(),
    guests: guestsCondition.required(),
})

const existingBookingSchema = Joi.object().keys({
    property: propertyCondition,
    checkIn: checkInCondition,
    checkOut: checkOutCondition,
    guests: guestsCondition,
}).unknown(true)

// TODO
const feedbackSchema = Joi.object().keys({
    user: usernameCondition,
    property: propertyCondition.required(),
    rating: ratingCondition,
    review: reviewCondition
}).or('rating', 'review')

module.exports = {
    newBookingSchema,
    existingBookingSchema
}