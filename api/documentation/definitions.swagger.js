/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-09
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *        description: readOnly fields can only be updated by users with escalated privileges
 *        type: object
 *        properties:
 *
 *           _id:
 *             type: string
 *             description: The id of the property
 *             readOnly: true
 *
 *           title:
 *             type: string
 *             description: The title of the property
 *             minLength: 16
 *             required: true
 *
 *           price:
 *             type: number
 *             description: The price of the property
 *             required: true
 *
 *           description:
 *             type: string
 *             description: The description of the property
 *
 *           type:
 *              allOf:
 *                  - type: string
 *                  - description: The type of the property
 *                  - $ref: '#/components/enums/propertyTypesEnum'
 *                  - required: true
 *
 *           beds:
 *             type: number
 *             description: The number of beds in the property
 *             minimum: 1
 *             maximum: 10
 *             default: 1
 *             required: true
 *
 *           baths:
 *             type: number
 *             description: The number of baths in the property
 *             minimum: 1
 *             maximum: 10
 *             default: 1
 *             required: true
 *
 *           rules:
 *             type: array
 *             description: The rules of the property
 *             items:
 *                 type: string
 *                 description: The rule of the property
 *
 *           amenities:
 *             type: array
 *             description: The amenities of the property
 *             items:
 *                 allOf:
 *                   - $ref: '#/components/enums/amenitiesEnum'
 *                   - type: string
 *                     description: The amenities of the property *
 *
 *           location:
 *             type: object
 *             description: The location of the property
 *             properties:
 *                 unit:
 *                     type: string
 *                     description: The unit of the property
 *                     example: A
 *                 street:
 *                     type: string
 *                     description: The street of the property
 *                     example: 123 Main St
 *                 city:
 *                     type: string
 *                     description: The city of the property
 *                     example: Toronto
 *                 province:
 *                     type: string
 *                     description: The province of the property
 *                     example: Ontario
 *                 country:
 *                     type: string
 *                     description: The country of the property
 *                     example: Canada
 *                 postalCode:
 *                     type: string
 *                     description: The postal code of the property
 *                     example: M1M1M1
 *                     format: postalCode
 *                 _id:
 *                     type: string
 *                     description: The id of the location of the property
 *                     readOnly: true
 *             required: true
 *
 *           best_seller:
 *             type: boolean
 *             description: Whether the property is best seller or not
 *             readOnly: true
 *
 *           thumbnail:
 *             type: string
 *             description: The thumbnail of the property
 *             format: uri
 *             example: https://www.example.com/image.jpg
 *
 *           photos:
 *             type: array
 *             description: The photos of the property
 *             items:
 *                 type: string
 *                 description: The photo of the property
 *                 format: uri
 *                 example: https://www.example.com/image.jpg
 *
 *     PropertyType:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The objectId of the property type
 *         count:
 *           type: number
 *           description: The number of properties of this type
 *           example: 5
 *
 *     Location:
 *       type: object
 *       properties:
 *          _id:
 *            type: object
 *            properties:
 *                 city:
 *                     type: string
 *                     description: The city of the location
 *                     example: Toronto
 *                 province:
 *                     type: string
 *                     description: The province of the location
 *                     example: Ontario
 *                 country:
 *                     type: string
 *                     description: The country of the location
 *                     example: Canada
 *          count:
 *             type: number
 *             description: The number of properties in this location
 *             example: 5
 */

/**
 * @swagger
 * components:
 *  responses:
 *    NotFound:
 *       description: Requested resource not found in the database
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       message:
 *                           type: string
 *                           description: The message of the response
 *                           example: "No properties found"
 *    InternalServerError:
 *       description: An error occurred - Server could not process the request.
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     description: The message of the response
 *                     example: "An error occurred"
 *                   error:
 *                     description: The error object with error details
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 *                       description: The error object key
 *                       example: "An error occurred"
 *    BadRequest:
 *       description: Bad request - Check your parameters, request body and/or query string.
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     description: The message of the response
 *                     example: "Bad request"
 *                   error:
 *                     description: The error object with error details
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 *                       description: The error object key
 *                       example: "Invalid query parameter"
 */