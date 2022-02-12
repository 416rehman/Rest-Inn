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

/** Retrieves all properties */
/**
 * @swagger
 * /properties:
 *  get:
 *      tags:
 *          - Properties
 *      summary: Retrieves all properties
 *      description: Retrieves all the properties in the database with an optional filter through query parameters
 *      parameters:
 *          - $ref: '#/components/propertyQueryParameters/priceMin'
 *          - $ref: '#/components/propertyQueryParameters/priceMax'
 *          - $ref: '#/components/propertyQueryParameters/bedsMin'
 *          - $ref: '#/components/propertyQueryParameters/bedsMax'
 *          - $ref: '#/components/propertyQueryParameters/bathsMin'
 *          - $ref: '#/components/propertyQueryParameters/bathsMax'
 *          - $ref: '#/components/propertyQueryParameters/type'
 *          - $ref: '#/components/propertyQueryParameters/city'
 *          - $ref: '#/components/propertyQueryParameters/province'
 *          - $ref: '#/components/propertyQueryParameters/country'
 *          - $ref: '#/components/propertyQueryParameters/postalCode'
 *          - $ref: '#/components/propertyQueryParameters/amenities'
 *          - $ref: '#/components/propertyQueryParameters/bestSeller'
 *
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          message:
 *                            type: string
 *                            description: The message of the response
 *                            example: "Retrieved all properties"
 *                          data:
 *                            type: array
 *                            description: The properties in the database
 *                            items:
 *                                $ref: '#/definitions/Property'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/', propertiesService.getAll);

/** Retrieves all property types in the database */
/**
 * @swagger
 * /properties/types:
 *  get:
 *     tags:
 *         - Property Types
 *     summary: Retrieves all property types in the database
 *     description: Retrieves all the property types in the database
 *     responses:
 *         '200':
 *             description: A successful response
 *             content:
 *                 application/json:
 *                     schema:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           description: The message of the response
 *                           example: Successfully retrieved all property types
 *                         data:
 *                           type: array
 *                           description: The property types in the database
 *                           items:
 *                             $ref: '#/definitions/PropertyType'
 *         '404':
 *             $ref: '#/components/responses/NotFound'
 *         '500':
 *             $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/types', propertiesService.getAllPropertyTypes);

/** Retrieves all the properties by type in the database */
/**
 * @swagger
 * /properties/types/{type}:
 *  get:
 *      tags:
 *          - Property Types
 *      summary: Retrieves all the properties by type in the database
 *      description: Retrieves all the properties by type in the database
 *      parameters:
 *          - allOf:
 *              - $ref: '#/components/propertyPathParameters/type'
 *              - required: true
 *      responses:
 *          '200':
 *            description: A successful response
 *            content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/definitions/Property'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 */
router.get('/types/:type', propertiesService.getAllByType);

/**
 * Retrieves all the locations in the database
 */
/**
 * @swagger
 * /properties/locations:
 *  get:
 *   tags:
 *     - Property Locations
 *   summary: Retrieves all the locations in the database
 *   description: Retrieves all the locations in the database
 *   responses:
 *     '200':
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message of the response
 *                 example: Successfully retrieved all locations
 *               data:
 *                 type: array
 *                 description: The locations in the database
 *                 items:
 *                   $ref: '#/definitions/Location'
 *     '404':
 *       $ref: '#/components/responses/NotFound'
 *     '500':
 *       $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/locations', propertiesService.getAllLocations);

/**
 * Retrieves all the properties in the database by location
 * Searches the location query string in the city, province, and country fields
 */
/**
 * @swagger
 * /properties/locations/{location}:
 *  get:
 *      tags:
 *          - Property Locations
 *      summary: Retrieves all the properties in the database by location
 *      description: Searches the location query string in the city, province, and country fields using an or operator
 *      parameters:
 *          - allOf:
 *              - $ref: '#/components/propertyPathParameters/location'
 *              - required: true
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                         message:
 *                           type: string
 *                           description: The message of the response
 *                           example: Successfully retrieved all properties by location
 *                           data:
 *                             type: array
 *                             description: The properties in the database
 *                             items:
 *                               $ref: '#/definitions/Property'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/locations/:location', propertiesService.getAllByLocation);

/** Retrieves all best-selling properties in the database */
/**
 * @swagger
 * /properties/bestselling:
 *  get:
 *    tags:
 *      - Property Best Selling
 *    summary: Retrieves all best-selling properties in the database
 *    description: Retrieves all best-selling properties in the database
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of the response
 *                  example: Successfully retrieved all best-selling properties
 *                data:
 *                  type: array
 *                  description: The best-selling properties in the database
 *                  items:
 *                    $ref: '#/definitions/Property'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 *      '500':
 *        $ref: '#/components/responses/InternalServerError'
 */
router.get('/bestselling', propertiesService.getAllBestSellers);

/** Creates a new property in the database */
/**
 * @swagger
 * /properties:
 *  post:
 *    tags:
 *      - Properties
 *    summary: Creates a new property in the database
 *    description: Creates a new property in the database using the body of the request
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Property'
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of the response
 *                  example: Successfully created property
 *                data:
 *                  type: object
 *                  description: The property that was created
 *                  $ref: '#/definitions/Property'
 *      '400':
 *        $ref: '#/components/responses/BadRequest'
 *      '500':
 *        $ref: '#/components/responses/InternalServerError'
 */
router.post('/', propertiesService.add);

/** Updates a property in the database */
/**
 * @swagger
 * /properties/{id}:
 *  put:
 *    tags:
 *      - Properties
 *    summary: Updates a property in the database
 *    description: Updates a property in the database using the body of the request. If changing any location attributes, an entire location object must be provided to avoid replacing the entire location.
 *    parameters:
 *      - allOf:
 *          - $ref: '#/components/propertyPathParameters/id'
 *          - required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Property'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of the response
 *                  example: Successfully updated property
 *                data:
 *                  type: object
 *                  description: The property that was updated with the new values
 *                  $ref: '#/definitions/Property'
 *
 *      '400':
 *        $ref: '#/components/responses/BadRequest'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 *      '500':
 *        $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', propertiesService.updateById);

/** Deletes a property from the database */
/**
 * @swagger
 * /properties/{id}:
 *  delete:
 *    tags:
 *      - Properties
 *    summary: Deletes a property from the database
 *    description: Deletes a property from the database
 *    parameters:
 *      - $ref: '#/components/propertyPathParameters/id'
 *    responses:
 *      '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                   example: Successfully deleted property
 *      '404':
 *         $ref: '#/components/responses/NotFound'
 *      '500':
 *         $ref: '#/components/responses/InternalServerError'
 *      '400':
 *         $ref: '#/components/responses/BadRequest'
 *
 */
router.delete('/:id', propertiesService.deleteById);

/** Retrieves a single property from the database */
/**
 * @swagger
 * /properties/{id}:
 *  get:
 *    tags:
 *      - Properties
 *    summary: Retrieves a single property from the database
 *    description: Retrieves a single property from the database by its id
 *    parameters:
 *      - $ref: '#/components/propertyPathParameters/id'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of the response
 *                  example: "Retrieved property"
 *                data:
 *                  description: The retrieved property
 *                  $ref: '#/definitions/Property'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 *      '500':
 *        $ref: '#/components/responses/InternalServerError'
 *      '400':
 *        $ref: '#/components/responses/BadRequest'
 */
router.get('/:id', propertiesService.getOneById);

module.exports = router;
