/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const {propertyTypes, amenities, listingTypes} = require("../../constants/property.constants");
const mongoose = require("mongoose");
const bookingModel = require("../booking/booking.model");
const {s3Url} = require("../../helpers/mongooseGetters");

const LocationSchema = new mongoose.Schema({
    unit: String,
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
})

const PropertySchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: propertyTypes,
        required: true,
        default: propertyTypes[0] || "Apartment"
    },
    bedrooms: {
        type: Number,
        required: true,
        default: 0
    },
    beds: {
        type: Number,
        required: true,
        default: 1
    },
    baths: {
        type: Number,
        required: true,
        default: 1
    },
    rules: [String],
    amenities: {
        type: [String],
        enum: amenities,
        required: true,
        default: []
    },
    location: {
        type: LocationSchema,
        required: true
    },
    bestSeller: {
        type: Boolean,
        default: false,
        required: true
    },
    photos: {
        type: [String],
        get: s3Url,
    },
    listingType: {
        type: String,
        enum: listingTypes,
        default: listingTypes[0],
    },
    guests: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
}, {
    timestamps: true,
    toJSON:{
        getters: true,
    },
    // Allows case-insensitive searching
    collation: {
        locale: 'en_US',
        strength: 2
    }
});

PropertySchema.virtual('rating').get(function () {
    const filter = {property: this._id, rating: { $ne: null}}

    const rating = {
        average: 0,
        count: 0
    }

    bookingModel.find(filter).then(bookings => {
        let rating = [0, 0, 0, 0, 0];
        bookings.forEach(booking => {
            rating[booking.rating - 1]++;
        });
        rating.average = rating.reduce((acc, curr) => acc + curr, 0) / bookings.length || 0
        rating.total = bookings.length || 0
    });

    return rating;
});

const model = mongoose.model("Property", PropertySchema);
module.exports = model;