const propertyModel = require('./property.model')
const bookingModel = require('../booking/booking.model')

/**
 * Returns all properties
 * @param filter
 * @param limit
 * @param page
 * @param sort
 * @return {Promise<Array<HydratedDocument<any, {}, {}>>>}
 */
module.exports.getAll = function (filter, limit=10, page=0, sort) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    return propertyModel.find(filter).limit(limit).skip((page - 1) * limit).sort(sort).exec()
}

/**
 * Returns count of all properties
 * @param filter
 * @return {Promise<number>}
 */
module.exports.count = function (filter={}) {
    return propertyModel.countDocuments(filter).exec()
}

/**
 * Returns all property types (e.g. house, apartment, etc.)
 * @return {Promise<Array<any>>}
 */
module.exports.getAllTypes = function () {
    return propertyModel.aggregate([
        {
            $group: {
                _id: "$type",
                count: {$sum: 1}
            }
        }
    ]).exec();
}

/**
 * Returns all property types (e.g. entire place, private room, etc.) that are not null
 * @return {Promise<Array<any>>}
 */

module.exports.getAllListingTypes = function () {
    return propertyModel.aggregate([
        {
            $group: {
                _id: "$listingType",
                count: {$sum: 1}
            }
        }
    ]).exec();
}

/**
 * Returns all properties by types (e.g. house, apartment, etc.)
 * @param type - {type: String} i.e. {type: 'house'}
 * @param limit - Number
 * @param page - Number
 * @param sort - {field: Integer} i.e. {price: 1}
 * @return {Promise}
 */
module.exports.getAllByType = function (type, limit=10, page=1, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertyModel.find({type}).limit(limit).skip((page - 1) * limit).sort(sort).exec();
}

/**
 * Get all location cities, provinces, and countries and their count
 * @return {Promise}
 */
module.exports.getAllLocations = function () {
    return propertyModel.aggregate([
        {
            $group: {
                _id: {
                    city: "$location.city",
                    province: "$location.province",
                    country: "$location.country",
                    startingFrom: {
                        $min: "$price"
                    }
                },
                count: {$sum: 1}
            }
        }
    ]).exec();
}

/**
 *  Get all properties by either city, province, or country
 *  @param location - String
 *  @param limit - Number
 *  @param page - Number
 *  @param sort - {field: Integer} i.e. {price: 1}
 *  */
module.exports.getAllByLocation = function (location,limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertyModel.find({
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

/** Returns all best selling properties
 *
 * @param limit
 * @param page
 * @param sort
 * @return {Promise}
 */
module.exports.getBestSellers = function (limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;
    return propertyModel.find({bestSeller: true}).limit(limit).skip((page - 1) * limit).sort(sort).exec();
}

/**
 * Returns a property by id
 *
 * @param id
 * @return {Promise}
 */
module.exports.getById = function (id) {
    return propertyModel.findById(id).populate({
        path: 'host',
        select: '-password -__v -createdAt -updatedAt -email -role -refreshToken -extension -activated -favorites'
    }).exec();
}

/**
 * Updates one property with the given filter
 *
 * @param filter
 * @param data
 * @return {Promise}
 */
module.exports.update = function (filter, data) {
    return propertyModel.findOneAndUpdate(filter, data, {new: true}).populate({
        path: 'host',
        select: '-password -__v -createdAt -updatedAt -email -role -refreshToken -extension -activated -favorites'
    }).exec();
}

/**
 * Deletes a property by id
 *
 * @return {Promise<any>}
 * @param filter
 */
module.exports.delete = function (filter) {
    return propertyModel.findOneAndDelete(filter).exec();
}

/**
 * Creates a new property
 *
 * @param data
 * @return {Promise<any>}
 */
module.exports.add = async function (data) {
    const property = new propertyModel(data);
    await property.save();
    return property;
}

/**
 * Returns all the reserved date blocks in a month for a property
 * @param id
 * @return {Promise<{start: Date, end: Date}[]>}
 */
module.exports.getReservedDates = async function (id) {
    return new Promise((resolve, reject) => {
        bookingModel.find({
            property: id,
        }).exec().then(bookings => {
            // Get all reserved dates in range
            const reservedDates = bookings.map(booking => {
                const start = booking.checkIn;
                const end = booking.checkOut;

                const dates = [];
                for (let i = start; i < end; i.setDate(i.getDate() + 1)) {
                    dates.push(new Date(i));
                }
                return dates;
            });

            // Flatten array
            const reservedDatesFlat = reservedDates.reduce((acc, val) => acc.concat(val), []);

            // group the dates by year and month
            const grouped = {};
            reservedDatesFlat.forEach(date => {
                const year = date.getFullYear();
                const month = date.getMonth();
                if (!grouped[year]) {
                    grouped[year] = {};
                }
                if (!grouped[year][month]) {
                    grouped[year][month] = [];
                }
                grouped[year][month].push(date);
            });

            resolve(grouped);
        }).catch(err => {
            reject(err);
        })
    });
}