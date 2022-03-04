const bookingModel = require('./booking.model')

/**
 * Returns all user bookings
 *
 * @param username {String}
 * @param filter {Object}
 * @param limit {Number}
 * @param page {Number}
 * @param sort {{field: Number}} -1 for descending, 1 for ascending
 * @return {Promise}
 */
module.exports.getBookingsByGuestUsername = function (username, filter={}, limit=10, page=0, sort={}) {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    const filterQuery = {
        ...filter,
        user: username
    };

    return bookingModel.find(filterQuery).limit(limit).skip((page - 1) * limit).sort(sort).exec();
};