/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
 const router = require('express').Router();
 const propertiesService = require('../services/properties.service')

/** Retrieves all the properties in the database */
router.get('/', propertiesService.getAll);

/** Retrieves all property types in the database */
router.get('/types', propertiesService.getAllPropertyTypes);

/** Retrieves all the properties by type in the database */
router.get('/types/:type', propertiesService.getAllByType);

/**
 * Retrieves all the locations in the database
 */
router.get('/locations', propertiesService.getAllLocations);

/**
 * Retrieves all the properties in the database by location
 * Searches the location query string in the city, province, and country fields
 */
router.get('/locations/:location', propertiesService.getAllByLocation);

/** Retrieves all best-selling properties in the database */
router.get('/bestselling', propertiesService.getAllBestSellers);

/** Retrieves a single property from the database */
 router.get('/:id', propertiesService.getOneById);

 /** Creates a new property in the database */
 router.post('/', propertiesService.add);

 /** Updates a property in the database */
 router.put('/:id', propertiesService.updateById);

 /** Deletes a property from the database */
 router.delete('/:id', propertiesService.deleteById);

module.exports = router;

