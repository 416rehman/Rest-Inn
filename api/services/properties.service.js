/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const upload = require('../middleware/multer.middleware');
const arrayUpload = upload.array('files');

const property = require('../models/property/property.methods');
const {
    idCondition,
    existingPropertyValidation,
    propertyTypeCondition
} = require('../helpers/property-validation');
const {sortFilter, buildPropertyFilter} = require("../helpers/filters");
const {listingTypes, propertyTypes, amenities} = require("../constants/property.constants");
const {update, getById} = require("../models/property/property.methods");
const {deleteFromS3} = require("../middleware/multer.middleware");

module.exports.getAll = async (req, res) => {
    console.log('getAll');
    let {page, limit} = req.query;
    const sort = sortFilter(req.query)
    console.log('sort')
    const filter = await buildPropertyFilter(req.query);
    console.log('filter');
    property.getAll(filter, limit, page, sort).then(async properties => {
        console.log(properties)
        if (properties.length === 0) {
            res.status(404).json({
                message: 'No properties found',
            });
        } else {
            console.log(properties.map(p => p.title))
            const count = await property.count(filter);
            res.json({
                message: 'Retrieved all properties',
                data: properties,
                pagination: {
                    page: page || 1,
                    limit: limit || 100,
                    totalPages: Math.ceil(count / (limit || 100)),
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
    if (req.query.all) {
        res.json({
            message: 'Retrieved all available property types',
            data: propertyTypes.map(pt => {
                return {
                    _id: pt,
                }
            })
        })
    } else {
        property.getAllTypes().then(propertyTypes => {
            if (propertyTypes.length === 0) {
                res.status(404).json({
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
}

module.exports.getAllListingTypes = (req, res) => {
    if (req.query.all) {
        res.json({
            message: 'Retrieved all available listing types',
            data: listingTypes.map(lt => {
                return {
                    _id: lt,
                }
            })
        })
    } else {
        property.getAllListingTypes().then(types => {
            if (types.length === 0) {
                res.status(404).json({
                    message: 'No Listing Types Found'
                })
            } else {
                res.json({
                    message: "Retrieved all listing types",
                    data: types
                })
            }
        }).catch(e => {
            res.status(500).json({
                message: "Failed to retrieve listing types",
                error: e.message
            })
        })
    }
}

module.exports.getAllAmenities = (req, res) => {
    res.json({
        message: 'Retrieved all amenities',
        data: amenities.map(amenity => {
            return {
                _id: amenity,
            }
        })
    })
}

module.exports.getAllByType = (req, res) => {
    propertyTypeCondition.validateAsync(req.params.type).then(type => {
        const {page, limit} = req.query;
        const sort = sortFilter(req.query)

        property.getAllByType(type, limit, page, sort).then(async properties => {
            if (properties.length === 0) {
                res.status(404).json({
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
                        totalPages: Math.ceil(count / (req.query.limit || 100)),
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
            res.status(404).json({
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

    property.getBestSellers(limit, page, sort).then(async properties => {
        if (properties.length === 0) {
            res.status(404).json({
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
    idCondition.validateAsync(req.params.id).then(id => {
        property.getById(id).then(property => {
            if (!property) {
                res.status(404).json({
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
        if (req.user) sanitized['host'] = req.user.id;
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

function addImages(req, res) {
    arrayUpload(req, res, function (err) {
        if (err) {
            res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        } else {
            if (req.files) {
                let newImages = req.files.map(file => {
                    return file.key
                })
                if (newImages.length > 0) {
                    update({_id: req.params.id}, {
                        $push: {
                            photos: {
                                $each: newImages
                            }
                        }
                    }).then(r => {
                        res.json({
                            message: 'Images added to property',
                            data: r
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: 'Error when adding images to property ' + req.params.id,
                            error: err.message
                        });
                    });
                }
            }
        }
    })
}

module.exports.updateById = (req, res) => {
    if (req.headers['content-type'] === 'application/json') {
        idCondition.validateAsync(req.params.id).then(id => {
            existingPropertyValidation.validateAsync(req.body).then(sanitized => {
                property.update({id, host: req.user.id}, sanitized).then(updatedProperty => {
                    if (sanitized['photosToRemove']) {
                        updatedProperty['photos'] = updatedProperty['photos'].filter(photo => {
                            deleteFromS3(photo);
                            return !sanitized['photosToRemove'].includes(photo)
                        })
                        updatedProperty.save().then(r => {
                            res.json({
                                message: 'Property updated',
                                data: r
                            })
                        }).catch(err => {
                            res.status(500).json({
                                message: 'Error when updating property',
                                error: err.message
                            });
                        });
                    }
                    else {
                        res.json({
                            message: 'Updated property by id',
                            data: updatedProperty
                        })
                    }
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
    } else {
        getById(req.params.id).then(property => {
            console.log(property.host);
            console.log(req.user.id);
            if (property.host.toString() === req.user.id) {
                addImages(req, res);
            } else {
                res.status(403).json({
                    message: 'You are not allowed to update this property',
                    error: 'You are not allowed to update this property'
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting property by id',
                error: err.message
            });
        });
    }

}

module.exports.deleteById = (req, res) => {
    idCondition.validateAsync(req.params.id).then(id => {
        property.delete({id, host: req.user.id}).then((d) => {
            console.log(d);
            if (d.deletedCount === 0) {
                res.status(404).json({
                    message: 'No property found or deleted',
                });
            } else {
                d.photos.forEach(photo => {
                    deleteFromS3(photo);
                })
                res.json({
                    message: 'Deleted property with id ' + id,
                })
            }
        }).catch(err => {
            console.log(err);
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

module.exports.getReservedDates = (req, res) => {
    idCondition.validateAsync(req.params.id).then(id => {
        property.getReservedDates(id).then(dates => {
            res.json({
                message: 'Retrieved reserved dates',
                data: dates
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Error when getting reserved dates',
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