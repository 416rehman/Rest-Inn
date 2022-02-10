/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const property = require('../models/property.model');
const {idCondition, existingPropertyValidation, propertyTypeCondition} = require('../helpers/property-validation');
const {buildPropertyFilter} = require("../helpers/filters");

module.exports.getAll = (req, res) => {

    const filter = buildPropertyFilter(req.query);
    property.getAll(filter).then(properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No properties found',
            });
        } else {
            res.json({
                message: 'Retrieved all properties',
                data: properties
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all properties',
            error: err
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
            error: err
        });
    });
}

module.exports.getAllByType = (req, res) => {
    propertyTypeCondition.validateAsync(req.params.type).then(type=>{
        property.getAllByType(type).then(properties => {
            if (properties.length === 0) {
                res.status(404).send({
                    message: 'No properties found of type ' + type,
                });
            } else {
                res.json({
                    message: 'Retrieved all properties of type ' + type,
                    data: properties
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting all properties of type ' + type,
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when getting all properties of type ' + req.params.type,
            error: err
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
            error: err
        });
    });
}

module.exports.getAllByLocation = (req, res) => {
    property.getAllByLocation(req.params.location.toLowerCase()).then(properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No properties found at location ' + req.params.location,
            });
        } else {
            res.json({
                message: 'Retrieved all properties at location ' + req.params.location,
                data: properties
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all properties by location',
            error: err
        });
    });
}

module.exports.getAllBestSellers = (req, res) => {
    property.getBestSellers().then(properties => {
        if (properties.length === 0) {
            res.status(404).send({
                message: 'No properties found with bestSeller set to ' + req.params.bestSeller,
            });
        } else {
            res.json({
                message: 'Retrieved all best sellers with bestSeller set to ' + req.params.bestSeller,
                data: properties
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting best seller properties',
            error: err
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
                    data: property
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting property by id',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when getting property by id',
            error: err
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
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error when adding property',
            error: err
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
                    error: err
                });
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Invalid property data',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid id',
            error: err
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
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid id',
            error: err
        });
    });
}