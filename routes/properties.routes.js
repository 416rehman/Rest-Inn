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
/**
 * @swagger
 * /properties:
 *  get:
 *      description: Retrieves all the properties in the database
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: string
 *                            description: The id of the property
 *                          title:
 *                            type: string
 *                            description: The title of the property
 *                          price:
 *                            type: number
 *                            description: The price of the property
 *                          description:
 *                            type: string
 *                            description: The description of the property
 *                          property_type:
 *                            type: string
 *                            description: The type of the property
 *                            enum: [house, apartment, condo, townhouse]
 *                          rules:
 *                            type: array
 *                            description: The rules of the property
 *                            items:
 *                              type: string
 *                              description: The rule of the property
 *                          amenities:
 *                            type: array
 *                            description: The amenities of the property
 *                            items:
 *                              type: string
 *                              description: The amenity of the property
 *                          location:
 *                            type: object
 *                            description: The location of the property
 *                            properties:
 *                              unit:
 *                                type: string
 *                                description: The unit of the property
 *                                example: A
 *                              street:
 *                                type: string
 *                                description: The street of the property
 *                                example: 123 Main St
 *                              city:
 *                                type: string
 *                                description: The city of the property
 *                                example: Toronto
 *                              province:
 *                                type: string
 *                                description: The province of the property
 *                                example: Ontario
 *                              country:
 *                                type: string
 *                                description: The country of the property
 *                                example: Canada
 *                              postalCode:
 *                                type: string
 *                                description: The postal code of the property
 *                                example: M1M1M1
 *                                format: postalCode
 *                              _id:
 *                                type: string
 *                                description: The id of the location of the property
 *                          best_seller:
 *                            type: boolean
 *                            description: Whether the property is best seller or not
 *                          thumbnail:
 *                            type: string
 *                            description: The thumbnail of the property
 *                            format: uri
 *                            example: https://www.example.com/image.jpg
 *                          photos:
 *                            type: array
 *                            description: The photos of the property
 *                            items:
 *                              type: string
 *                              description: The photo of the property
 *                              format: uri
 *                              example: https://www.example.com/image.jpg
 *          '500':
 *              description: An error occurred
 *
 */
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

module.exports.router = router;

module.exports.endpoints = [
    {method: 'get', url: '/properties', secured: false, description: "Get all properties"},
    {method: 'get', url: '/properties/types', secured: false, description: "Get all property types"},
    {method: 'get', url: '/properties/types/:type', secured: false, description: "Get all properties by type"},
    {method: 'get', url: '/properties/locations', secured: false, description: "Get all locations"},
    {method: 'get', url: '/properties/locations/:location', secured: false, description: "Get all properties by location"},
    {method: 'get', url: '/properties/bestselling', secured: false, description: "Get all best-selling properties"},
    {method: 'get', url: '/properties/:id', secured: false, description: "Get a single property"},
    {method: 'post', url: '/properties', secured: false, description: "Create a new property"},
    {method: 'put', url: '/properties/:id', secured: false, description: "Update a property"},
    {method: 'delete', url: '/properties/:id', secured: false, description: "Delete a property"}
];

