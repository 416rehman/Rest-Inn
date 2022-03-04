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
    rating: {
        type: Number,
        default: null,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);