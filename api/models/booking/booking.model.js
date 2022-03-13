const mongoose = require("mongoose");
const {bookingStatus} = require("../../constants/booking.constants");

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
    confirmationCode: {
        type: String,
    },
    guests: {
        // Adults and Children depend on the property guest capacity
        adults: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
        children: {
            type: Number,
        },
        // Infants are not included in the guest count
        infants: {
            type: Number,
            max: 5
        },
        // Pets are not included in the guests count. Depends on property rules
        pets: {
            type: Number,
            max: 5
        }
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: bookingStatus,
        default: 'pending',
    },
    rating: {
        type: Number,
        default: null,
        min: 0,
        max: 5
    },
    review: {
        type: String,
        default: null,
        maxlength: 500
    }
}, {
    timestamps: true
});

const bookingModel = mongoose.model('Booking', BookingSchema);

BookingSchema.pre('save', function (next) {
    this.confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    next();
});

module.exports = bookingModel;