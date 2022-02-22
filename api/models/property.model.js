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
const mongoose = require("mongoose");
const {calculateRating} = require("../helpers/mongooseGetters");

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
        minlength: 3,
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
    thumbnail: {
        type: String,
        default: 'https://placeimg.com/200/300/arch'
    },
    photos: [String],
    listingType: {
        type: String,
        enum: listingTypes,
        default: listingTypes[0]
    },
    rating: {
        type: [Number],
        default: [0, 0, 0, 0, 0],
        get: calculateRating
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

const propertySchema = mongoose.model("property", PropertySchema);

module.exports.property = propertySchema;

module.exports.getAll = function (filter={}, limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    return propertySchema.find(filter).limit(limit).skip((page - 1) * limit).sort(sort).exec()
}

module.exports.count = function (filter={}) {
    return propertySchema.countDocuments(filter).exec()
}

module.exports.getAllTypes = function () {
    return propertySchema.aggregate([
        {
            $group: {
                _id: "$type",
                count: {$sum: 1}
            }
        }
    ]).exec();
}

module.exports.getAllByType = function (type, limit=10, page=1, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertySchema.find({type}).limit(limit).skip((page - 1) * limit).sort(sort).exec();
}

//Get all location cities, provinces, and countries and their count
module.exports.getAllLocations = function () {
    return propertySchema.aggregate([
        {
            $group: {
                _id: {
                    city: "$location.city",
                    province: "$location.province",
                    country: "$location.country"
                },
                count: {$sum: 1}
            }
        }
    ]).exec();
}

/** Get all properties by either city, province, or country */
module.exports.getAllByLocation = function (location,limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertySchema.find({
        $or: [
            {
                "location.city": location
            }, {
                "location.province": location
            }, {
                "location.country": location
            }
        ]
    }).limit(limit).skip((page - 1) * limit).sort(sort).exec();
}

module.exports.getBestSellers = function (limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertySchema.find({bestSeller: true}).limit(limit).skip((page - 1) * limit).sort(sort).exec();
}

module.exports.getById = function (id) {
    return propertySchema.findById(id).exec();
}

module.exports.update = function (id, data) {
    return propertySchema.findByIdAndUpdate(id, data, {new: true}).exec();
}

module.exports.delete = function (id) {
    return propertySchema.findByIdAndDelete(id).exec();
}

module.exports.add = async function (data) {
    const property = new propertySchema(data);
    await property.save();
    return property;
}