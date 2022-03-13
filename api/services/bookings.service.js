const {newBookingSchema, existingBookingSchema} = require('../helpers/booking-validation')
const {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    approveBooking,
    rejectBooking,
    propertiesInReservedDateRange
} = require("../models/booking/booking.methods");
const Booking = require('../models/booking/booking.model');
const {bookingFilter, sortFilter} = require("../helpers/filters");
const {getById, getAll} = require("../models/property/property.methods");

module.exports.createBooking = (req, res) => {
    newBookingSchema.validateAsync(req.body).then(cleanedBody => {
        getById(cleanedBody.property).then(property => {
            if (property) {
                if ((property.host || property.host._id) === req.user.id) {
                    return res.status(403).json({
                        message: "Cannot book your own property"
                    });
                } else {
                    if (property.guests >= cleanedBody.guests.adults + cleanedBody.guests.children) {
                        propertiesInReservedDateRange(cleanedBody.checkIn, cleanedBody.checkOut).then((reservedProperties) => {
                            if (reservedProperties.length > 0) {
                                res.status(403).json({
                                    message: "Property is already booked on this date"
                                });
                            } else {
                                const data = {
                                    ...cleanedBody,
                                    user: req.user.id,
                                    price: (property.price * (new Date(cleanedBody.checkOut).getTime() - new Date(cleanedBody.checkIn).getTime()) / (1000 * 60 * 60 * 24)) + 60 + 30 // service and cleaning fees
                                };
                                createBooking(data).then(booking => {
                                    res.status(201).json(
                                        {
                                            message: "Booking Confirmed",
                                            data: {...booking.toObject(), property: property}
                                        }
                                    );
                                }).catch(err => {
                                    res.status(400).json(err);
                                });
                            }
                        }).catch(err => {
                            res.status(400).json({
                                message: "Error checking reserved dates",
                                error: err
                            });
                        });
                    } else {
                        res.status(400).json({
                            message: "Property does not have enough capacity",
                        });
                    }
                }
            } else {
                res.status(404).json({message: "Property not found"});
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                message: "Invalid property id",
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: "Invalid booking data",
            error: err
        });
    });
}

module.exports.getUserBookings = (req, res) => {
    const {page, limit, forHosts} = req.query;
    if (forHosts) {
        getHostBookings(req, res);
    } else {
        const sort = sortFilter(req.query)

        existingBookingSchema.validateAsync(req.query).then(cleanedQuery => {

            const filter = {
                ...bookingFilter(cleanedQuery),
                user: req.user.id
            }

            getAllBookings(filter, limit, page, sort).then(bookings => {
                if (bookings.length > 0) {
                    Booking.countDocuments(filter).then(count => {
                        res.status(200).json({
                            message: "Bookings retrieved successfully",
                            data: bookings,
                            pagination: {
                                page: page || 1,
                                limit: limit || 100,
                                totalPages: Math.ceil(count / (limit || 100)),
                                count: count
                            }
                        });
                    }).catch(err => {
                        res.status(400).json({
                            message: "Error retrieving bookings",
                            error: err
                        });
                    });
                } else {
                    res.status(404).json({
                        message: "No bookings found"
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    message: "Error retrieving bookings",
                    error: err.message
                })
            })
        }).catch(err => {
            res.status(400).json({
                message: 'Validation error in query',
                error: err.message
            })
        })
    }
}

const getHostBookings = (req, res) => {
    const {page, limit} = req.query;
    const sort = sortFilter(req.query)

    existingBookingSchema.validateAsync(req.query).then(cleanedQuery => {


        getAll({host: req.user.id}).then(properties => {
            const filter = {
                ...bookingFilter(cleanedQuery),
                host: req.user.id,
                property: {$in: properties.map(property => property.id)},
            }

            getAllBookings(filter, limit, page, sort).then(bookings => {
                if (bookings.length > 0) {
                    Booking.countDocuments(filter).then(count => {
                        res.status(200).json({
                            message: "Bookings retrieved successfully",
                            data: bookings,
                            pagination: {
                                page: page || 1,
                                limit: limit || 100,
                                totalPages: Math.ceil(count / (limit || 100)),
                                count: count
                            }
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error retrieving bookings",
                            error: err.message
                        })
                    })
                } else {
                    res.status(404).json({
                        message: "No bookings found"
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    message: "Error retrieving bookings",
                    error: err.message
                })
            })
        })
    })
}

/** TODO:
 *  - Users should only be able to see their own bookings
 */
module.exports.getBooking = (req, res) => {
    const {id} = req.params;

    getBookingById(id).then(booking => {
        res.status(200).json({
            message: "Booking retrieved successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error retrieving booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the guest or host
 */
module.exports.cancelBooking = (req, res) => {
    const {id} = req.params;

    cancelBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking cancelled successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error cancelling booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the host
 */
module.exports.approveBooking = (req, res) => {
    const {id} = req.params;

    approveBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking approved successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error approving booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the host
 */
module.exports.rejectBooking = (req, res) => {
    const {id} = req.params;

    rejectBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking rejected successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error rejecting booking",
            error: err.message
        })
    })
}