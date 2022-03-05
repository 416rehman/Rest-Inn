const {bookingStatus} = require("../constants/booking.constants");
const Joi = require("joi").extend(require("@hapi/joi-date"));
const {usernameCondition} = require('./user-validation');

const propertyCondition = Joi.string().regex(/^[a-f\d]{24}$/i).label('Listing Id')
const checkInCondition = Joi.date().format('MM/DD/YYYY').label('Check In Date (MM/DD/YYYY)')
const checkOutCondition = Joi.date().format('MM/DD/YYYY').label('Check Out Date (MM/DD/YYYY)')
const adultsCondition = Joi.number().min(1).max(10).label('Number of Adults')
const childrenCondition = Joi.number().min(0).max(10).label('Number of Children')
const infantsCondition = Joi.number().min(0).max(10).label('Number of Infants')
const petsCondition = Joi.number().min(0).max(10).label('Number of Pets')
const guestsCondition = Joi.object().keys({
    adults: adultsCondition,
    children: childrenCondition,
    infants: infantsCondition,
    pets: petsCondition
}).label('Guests')
const priceCondition = Joi.number().min(0).label('Price')
const statusCondition = Joi.string().valid(...bookingStatus).label('Status')
const ratingCondition = Joi.number().min(0).max(5).label('Rating')
const reviewCondition = Joi.string().max(500).label('Review')

/** TODO:
 * - Use proper auth for user
 */
const newBookingSchema = Joi.object().keys({
    user: usernameCondition,
    property: propertyCondition.required(),
    checkIn: checkInCondition.required(),
    checkOut: checkOutCondition.required(),
    guests: guestsCondition.required(),
    price: priceCondition.required(),
    status: statusCondition
})

/** TODO:
 * - Use proper auth for user
 */
const existingBookingSchema = Joi.object().keys({
    user: usernameCondition,
    property: propertyCondition,
    checkIn: checkInCondition,
    checkOut: checkOutCondition,
    guests: guestsCondition,
    price: priceCondition,
    status: statusCondition
})

/** TODO:
 * - Use proper auth for user
 */
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