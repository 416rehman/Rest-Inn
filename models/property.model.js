/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const {propertyTypes, amenities} = require("./property.model");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
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

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    property_type: {
        type: String,
        enum: propertyTypes,
        required: true
    },
    rules: [String],
    amenities: {
        type: [String],
        enum: amenities,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    best_seller: {
        type: Boolean,
        default: false,
        required: true
    },
    thumbnail: {
        type: String,
        default: 'https://placeimg.com/200/300/arch'
    },
    photo: [String],
})

const property = mongoose.model("property", propertySchema);

module.exports.property = property;