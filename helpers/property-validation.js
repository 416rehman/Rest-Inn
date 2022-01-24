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

// Data Conditions
const titleCondition = Joi.string().min(3).max(255).label('Title')
const priceCondition = Joi.number().min(0).max(999999).label('Price')
const descriptionCondition = Joi.string().min(3).max(2048).label('Description')
const propertyTypeCondition = Joi.string().valid(propertyTypes).label('Property Type')
const ruleCondition = Joi.string().min(3).max(255).label('Rule')
const rulesCondition = Joi.array().items(ruleCondition).label('Rules')
const amenityCondition = Joi.string().valid(amenities).label('Amenity')
const amenitiesCondition = Joi.array().items(amenityCondition).label('Amenities')

//Location Conditions
const unitCondition = Joi.string().min(1).max(32).label('Unit');
const streetCondition = Joi.string().min(1).max(255).label('Street');
const cityCondition = Joi.string().min(1).max(255).label('City');
const provinceCondition = Joi.string().min(1).max(255).label('Province');
const countryCondition = Joi.string().min(1).max(255).label('Country');
const postalCodeCondition = Joi.string().min(1).max(32).label('Postal Code')
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

const newPropertyValidation = Joi.object().keys({
    title: titleCondition.required(),
    price: priceCondition.required(),
    description: descriptionCondition,
    propertyType: propertyTypeCondition.required(),
    rules: rulesCondition,
    amenities: amenitiesCondition.required(),
    location: locationCondition.required(),
    bestSeller: bestSellerCondition.required(),
    photos: photosCondition
})

const existingPropertyValidation = Joi.object().keys({
    title: titleCondition,
    price: priceCondition,
    description: descriptionCondition,
    propertyType: propertyTypeCondition,
    rules: rulesCondition,
    amenities: amenitiesCondition,
    location: locationCondition,
    bestSeller: bestSellerCondition,
    photos: photosCondition
})

module.exports = {
    newPropertyValidation,
    existingPropertyValidation,
    titleCondition,
    priceCondition,
    descriptionCondition,
    propertyTypeCondition,
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
    photosCondition
}