/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const property = require('../models/property/property.methods');
const {idCondition, existingPropertyValidation, propertyTypeCondition} = require('../helpers/property-validation');
const {propertyFilter, sortFilter} = require("../helpers/filters");

module.exports.getAll = (req, res) => {

    const {page, limit} = req.query;
    const sort = sortFilter(req.query)
    const filter = propertyFilter(req.query);

    property.getAll(filter,limit, page, sort).then(async properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No properties found',
            });
        } else {
            const count = await property.count(filter);

            res.json({
                message: 'Retrieved all properties',
                data: properties,
                pagination: {
                    page: req.query.page || 1,
                    limit: req.query.limit || 100,
                    totalPages: Math.ceil(count /  (req.query.limit || 100)),
                    count: count
                }
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error when getting all properties',
            error: err.message
        });
    });
}

module.exports.getAllPropertyTypes = (req, res) => {
    property.getAllTypes().then(propertyTypes => {
        if (propertyTypes.length === 0) {
            res.status(404).send({
                message: 'No property types found',
            });
        } else {
            res.json({
                message: 'Retrieved all property types',
                data: propertyTypes
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all property types',
            error: err.message
        });
    });
}

module.exports.getAllByType = (req, res) => {
    propertyTypeCondition.validateAsync(req.params.type).then(type=>{
        const {page, limit} = req.query;
        const sort = sortFilter(req.query)

        property.getAllByType(type, limit, page, sort).then(async properties => {
            if (properties.length === 0) {
                res.status(404).send({
                    message: 'No properties found of type ' + type,
                });
            } else {
                const count = await property.count({type});
                res.json({
                    message: 'Retrieved all properties of type ' + type,
                    data: properties,
                    pagination: {
                        page: req.query.page || 1,
                        limit: req.query.limit || 100,
                        totalPages: Math.ceil(count /  (req.query.limit || 100)),
                        count: count
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting all properties of type ' + type,
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when getting all properties of type ' + req.params.type,
            error: err.message
        });
    });
}

module.exports.getAllLocations = (req, res) => {
    property.getAllLocations().then(locations => {
        if (locations.length === 0) {
            res.status(404).json({
                message: 'No locations found',
            });
        } else {
            res.json({
                message: 'Retrieved all locations',
                data: locations
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all locations',
            error: err.message
        });
    });
}

module.exports.getAllByLocation = (req, res) => {
    const {page, limit} = req.query;
    const sort = sortFilter(req.query)

    property.getAllByLocation(req.params.location, limit, page, sort).then(properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No properties found at location ' + req.params.location,
            });
        } else {
            const count = property.count({location: req.params.location});
            res.json({
                message: 'Retrieved all properties at location ' + req.params.location,
                data: properties,
                pagination: {
                    page: req.query.page || 1,
                    limit: req.query.limit || 100,
                    totalPages: Math.ceil(count / (req.query.limit || 100)),
                    count: count
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all properties by location',
            error: err.message
        });
    });
}

module.exports.getAllBestSellers = (req, res) => {
    const {page, limit} = req.query;
    const sort = sortFilter(req.query)
    console.log(limit)
    property.getBestSellers(limit, page, sort).then(async properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No Best Sellers found',
            });
        } else {
            const count = await property.count({bestSeller: true});
            res.json({
                message: 'Retrieved all best sellers with bestSeller',
                data: properties,
                pagination: {
                    page: req.query.page || 1,
                    limit: req.query.limit || 100,
                    totalPages: Math.ceil(count / (req.query.limit || 100)),
                    count: count
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting best seller properties',
            error: err.message
        });
    });
}

module.exports.getOneById = (req, res) => {
    idCondition.validateAsync(req.params.id).then(id=>{
        property.getById(id).then(property => {
            if (!property) {
                res.status(404).send({
                    message: 'No property found with id ' + id,
                });
            } else {
                res.json({
                    message: 'Retrieved property with id ' + id,
                    data: property,
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting property by id',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when getting property by id',
            error: err.message
        });
    });
}

module.exports.add = (req, res) => {
    existingPropertyValidation.validateAsync(req.body).then(sanitized => {
        property.add(sanitized).then(property => {
            res.status(201).json({
                message: 'Added property',
                data: property
            })
        }).catch(err => {
            res.status(500).json({
                message: err.code === 11000 ? 'Property already exists' : 'Error when adding property',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when adding property',
            error: err.message
        });
    });
}

module.exports.updateById = (req, res) => {
    idCondition.validateAsync(req.params.id).then(id => {
        existingPropertyValidation.validateAsync(req.body).then(sanitized => {
            property.update(id, sanitized).then(updatedProperty => {
                res.json({
                    message: 'Updated property by id',
                    data: updatedProperty
                })
            }).catch(err => {
                res.status(500).json({
                    message: 'Error when updating property by id',
                    error: err.message
                });
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Invalid property data',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid id',
            error: err.message
        });
    });
}

module.exports.deleteById = (req, res) => {
    idCondition.validateAsync(req.params.id).then(id => {
        property.delete(id).then(() => {
            res.json({
                message: 'Deleted property by id'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Error when deleting property by id',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid id',
            error: err.message
        });
    });
}