const mongoose = require("mongoose");
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
        // Adults and Children depend on the property guest capacity
        adults: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
        children: {
            type: Number,
            required: true
        },
        // Infants are not included in the guest count
        infants: {
            type: Number,
            required: true,
            max: 5
        },
        // Pets are not included in the guests count. Depends on property rules
        pets: {
            type: Number,
            required: true,
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
module.exports = bookingModel;

module.exports.addFeedback = async function (bookingId, rating, review) {
    const booking = await this.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    if (booking.checkOut > new Date()) {
        throw new Error('Booking is not completed yet - cannot add feedback');
    }
    if (rating) {
        booking.rating = rating;
    }
    if (review) {
        booking.review = review;
    }
    await booking.save();
};