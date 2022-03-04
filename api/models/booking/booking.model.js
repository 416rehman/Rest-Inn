import mongoose from "mongoose";
const {bookingStatus} = require("../../constants/booking.constants");
const BookingSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: bookingStatus,
        default: 'pending'
    },
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

/**
 * Returns all user bookings
 *
 * @param username {String}
 * @param filter {Object}
 * @param limit {Number}
 * @param page {Number}
 * @param sort {{field: Number}} -1 for descending, 1 for ascending
 * @return {Promise}
 */
module.exports.getBookingsByGuestUsername = function (username, filter={}, limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    const filterQuery = {
        ...filter,
        user: username
    };

    return Booking.find(filterQuery).limit(limit).skip((page - 1) * limit).sort(sort).exec();
};