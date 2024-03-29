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

const {propertyTypes, amenities, listingTypes} = require("../constants/property.constants");

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
const bedroomCondition = Joi.number().min(0).max(10).label('Bedrooms')
const bathCondition = Joi.number().min(0).max(10).label('Baths')
const listingTypeCondition = Joi.string().valid(...listingTypes).label('Listing Type').lowercase()
const guestCondition = Joi.number().min(0).max(100).label('Guests')
const monthCondition = Joi.number().min(0).max(12).label('Month')
const yearCondition = Joi.number().min(0).max(9999).label('Year')

//Location Conditions
const unitCondition = Joi.string().min(0).max(16).label('Unit').lowercase();
const streetCondition = Joi.string().min(1).max(64).label('Street').lowercase();
const cityCondition = Joi.string().min(1).max(64).label('City').lowercase();
const provinceCondition = Joi.string().min(1).max(64).label('Province').lowercase();
const countryCondition = Joi.string().min(1).max(64).label('Country').lowercase();
const postalCodeCondition = Joi.string().min(1).max(12).label('Postal Code').lowercase()
const locationCondition = Joi.object().keys({
    unit: unitCondition,
    street: streetCondition.required(),
    city: cityCondition.required(),
    province: provinceCondition.required(),
    country: countryCondition.required(),
    postalCode: postalCodeCondition.required()
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
    bedrooms: bedroomCondition.required(),
    baths: bathCondition.required(),
    rules: rulesCondition,
    amenities: amenitiesCondition,
    location: locationCondition.required(),
    bestSeller: bestSellerCondition,
    thumbnail: photoCondition,
    photos: photosCondition,
    listingType: listingTypeCondition,
    guests: guestCondition
}).unknown(true);

// use this to validate a property in PUT
const existingPropertyValidation = Joi.object().keys({
    title: titleCondition,
    price: priceCondition,
    description: descriptionCondition,
    type: propertyTypeCondition,
    beds: bedCondition,
    bedrooms: bedroomCondition,
    baths: bathCondition,
    rules: rulesCondition,
    amenities: amenitiesCondition,
    location: locationCondition,
    bestSeller: bestSellerCondition,
    photos: photosCondition,
    listingType: listingTypeCondition,
    guests: guestCondition
}).unknown(true);

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
    guestCondition,
    monthCondition,
    yearCondition,
    idCondition
}