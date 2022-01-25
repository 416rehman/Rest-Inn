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

module.exports.getAll = (req, res) => {
    property.getAll().then(properties => {
        res.json({
            message: 'Retrieved all properties',
            data: properties
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all properties',
            error: err
        });
    });
}

module.exports.getAllPropertyTypes = (req, res) => {
    property.getAllTypes().then(propertyTypes => {
        res.json({
            message: 'Retrieved all property types',
            data: propertyTypes
        })
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
            res.json({
                message: 'Retrieved all properties of type ' + type,
                data: properties
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting all properties of type ' + type,
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Error when getting all properties of type ' + type,
            error: err
        });
    });
}

module.exports.getAllLocations = (req, res) => {
    property.getAllLocations().then(locations => {
        res.json({
            message: 'Retrieved all locations',
            data: locations
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all locations',
            error: err
        });
    });
}

module.exports.getAllByLocation = (req, res) => {
    const formattedLocation = req.params.location.replace(/-/g, ' ');
    property.getAllByLocation(formattedLocation.toLowerCase()).then(properties => {
        res.json({
            message: 'Retrieved properties by location',
            data: properties
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Error when getting all properties by location',
            error: err
        });
    });
}

module.exports.getAllBestSellers = (req, res) => {
    property.getBestSellers().then(properties => {
        res.json({
            message: 'Retrieved best seller properties',
            data: properties
        })
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
            res.json({
                message: 'Retrieved property by id',
                data: property
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting property by id',
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

module.exports.add = (req, res) => {
    existingPropertyValidation.validateAsync(req.body).then(sanitized => {
        property.add(sanitized).then(property => {
            res.json({
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
            message: 'Invalid property',
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
            console.log(err);
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