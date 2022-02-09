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
 * definitions:
 *   Property:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *           description: The id of the property
 *         title:
 *           type: string
 *           description: The title of the property
 *         price:
 *           type: number
 *           description: The price of the property
 *         description:
 *           type: string
 *           description: The description of the property
 *         type:
 *           type: string
 *           description: The type of the property
 *           enum: [house, apartment, condo, townhouse]
 *         beds:
 *           type: number
 *           description: The number of beds in the property
 *           minimum: 1
 *           maximum: 10
 *           default: 1
 *         baths:
 *           type: number
 *           description: The number of baths in the property
 *           minimum: 1
 *           maximum: 10
 *           default: 1
 *         rules:
 *           type: array
 *           description: The rules of the property
 *           items:
 *               type: string
 *               description: The rule of the property
 *         amenities:
 *           type: array
 *           description: The amenities of the property
 *           items:
 *               type: string
 *               description: The amenity of the property
 *         location:
 *           type: object
 *           description: The location of the property
 *           properties:
 *               unit:
 *                   type: string
 *                   description: The unit of the property
 *                   example: A
 *               street:
 *                   type: string
 *                   description: The street of the property
 *                   example: 123 Main St
 *               city:
 *                   type: string
 *                   description: The city of the property
 *                   example: Toronto
 *               province:
 *                   type: string
 *                   description: The province of the property
 *                   example: Ontario
 *               country:
 *                   type: string
 *                   description: The country of the property
 *                   example: Canada
 *               postalCode:
 *                   type: string
 *                   description: The postal code of the property
 *                   example: M1M1M1
 *                   format: postalCode
 *               _id:
 *                   type: string
 *                   description: The id of the location of the property
 *         best_seller:
 *           type: boolean
 *           description: Whether the property is best seller or not
 *         thumbnail:
 *           type: string
 *           description: The thumbnail of the property
 *           format: uri
 *           example: https://www.example.com/image.jpg
 *         photos:
 *           type: array
 *           description: The photos of the property
 *           items:
 *               type: string
 *               description: The photo of the property
 *               format: uri
 *               example: https://www.example.com/image.jpg
 *   PropertyType:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The objectId of the property type
 *       count:
 *         type: number
 *         description: The number of properties of this type
 *         example: 5
 *
 */