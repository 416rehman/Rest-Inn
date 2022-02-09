const Joi = require("joi");
/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const {propertyTypes, amenities} = require("../constants/property.constants");

// Mongo ObjectId validation
const idCondition = Joi.string().regex(/^[a-f\d]{24}$/i)

// Property Conditions
const titleCondition = Joi.string().min(16).max(255).label('Title')
const priceCondition = Joi.number().min(0).max(999999).label('Price')
const descriptionCondition = Joi.string().min(3).max(2048).label('Description')
const propertyTypeCondition = Joi.string().valid(...propertyTypes).label('Property Type').lowercase()
const ruleCondition = Joi.string().min(3).max(255).label('Rule').lowercase()
const rulesCondition = Joi.array().items(ruleCondition).label('Rules')
const amenityCondition = Joi.string().valid(...amenities).label('Amenity').lowercase()
const amenitiesCondition = Joi.array().items(amenityCondition).label('Amenities')
const bedCondition = Joi.number().min(0).max(10).label('Beds')
const bathCondition = Joi.number().min(0).max(10).label('Baths')

//Location Conditions
const unitCondition = Joi.string().min(1).max(32).label('Unit').lowercase();
const streetCondition = Joi.string().min(1).max(255).label('Street').lowercase();
const cityCondition = Joi.string().min(1).max(255).label('City').lowercase();
const provinceCondition = Joi.string().min(1).max(255).label('Province').lowercase();
const countryCondition = Joi.string().min(1).max(255).label('Country').lowercase();
const postalCodeCondition = Joi.string().min(1).max(32).label('Postal Code').lowercase()
const locationCondition = Joi.object().keys({
    unit: unitCondition,
    street: streetCondition,
    city: cityCondition,
    province: provinceCondition,
    country: countryCondition,
    postalCode: postalCodeCondition
})

const bestSellerCondition = Joi.boolean().label('Best Seller')
const photoCondition = Joi.string().min(1).max(512).label('Photo')
const photosCondition = Joi.array().items(photoCondition).label('Photos')

// Use this to validate a property in POST
const newPropertyValidation = Joi.object().keys({
    title: titleCondition.required(),
    price: priceCondition.required(),
    description: descriptionCondition,
    type: propertyTypeCondition.required(),
    beds: bedCondition.required(),
    baths: bathCondition.required(),
    rules: rulesCondition,
    amenities: amenitiesCondition.required(),
    location: locationCondition.required(),
    best_seller: bestSellerCondition.required(),
    thumbnail: photoCondition,
    photos: photosCondition
})

// use this to validate a property in PUT
const existingPropertyValidation = Joi.object().keys({
    title: titleCondition,
    price: priceCondition,
    description: descriptionCondition,
    type: propertyTypeCondition,
    beds: bedCondition,
    baths: bathCondition,
    rules: rulesCondition,
    amenities: amenitiesCondition,
    location: locationCondition,
    best_seller: bestSellerCondition,
    thumbnail: photoCondition,
    photos: photosCondition
})

module.exports = {
    newPropertyValidation,
    existingPropertyValidation,
    titleCondition,
    priceCondition,
    descriptionCondition,
    propertyTypeCondition,
    bedCondition,
    bathCondition,
    ruleCondition,
    rulesCondition,
    amenityCondition,
    amenitiesCondition,
    unitCondition,
    streetCondition,
    cityCondition,
    provinceCondition,
    countryCondition,
    postalCodeCondition,
    locationCondition,
    bestSellerCondition,
    photoCondition,
    photosCondition,
    idCondition
}