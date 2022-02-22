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
 *      description: readOnly fields can only be updated by users with escalated privileges
 *      type: object
 *      properties:
 *
 *         _id:
 *           $ref: '#/components/propertyParameters/id/schema'
 *
 *         title:
 *           allOf:
 *             - $ref: '#/components/propertyParameters/title/schema'
 *             - required: true
 *
 *         price:
 *           allOf:
 *             - $ref: '#/components/propertyParameters/price/schema'
 *             - required: true
 *
 *         description:
 *           $ref: '#/components/propertyParameters/description/schema'
 *
 *         type:
 *            allOf:
 *              - $ref: '#/components/propertyParameters/type/schema'
 *              - required: true
 *         listingType:
 *            allOf:
 *              - $ref: '#/components/propertyParameters/listingType/schema'
 *              - required: true
 *         bedrooms:
 *            allOf:
 *              - $ref: '#/components/propertyParameters/bedrooms/schema'
 *              - required: true
 *         beds:
 *            allOf:
 *              - $ref: '#/components/propertyParameters/beds/schema'
 *              - required: true
 *
 *         baths:
 *            allOf:
 *              - $ref: '#/components/propertyParameters/baths/schema'
 *              - required: true
 *
 *         rules:
 *           $ref: '#/components/propertyParameters/rules/schema'
 *
 *         amenities:
 *           $ref: '#/components/propertyParameters/amenities/schema'
 *
 *         location:
 *           type: object
 *           description: The location of the property
 *           properties:
 *               unit:
 *                   $ref: '#/components/propertyParameters/unit/schema'
 *               street:
 *                   $ref: '#/components/propertyParameters/street/schema'
 *               city:
 *                   $ref: '#/components/propertyParameters/city/schema'
 *               province:
 *                   $ref: '#/components/propertyParameters/province/schema'
 *               country:
 *                   $ref: '#/components/propertyParameters/country/schema'
 *               postalCode:
 *                   $ref: '#/components/propertyParameters/postalCode/schema'
 *               _id:
 *                   allOf:
 *                       - $ref: '#/components/propertyParameters/id/schema'
 *                       - description: The id of the location
 *                       - readOnly: true
 *           required: true
 *
 *         bestSeller:
 *           allOf:
 *               - $ref: '#/components/propertyParameters/bestSeller/schema'
 *               - readOnly: true
 *
 *         thumbnail:
 *           $ref: '#/components/propertyParameters/thumbnail/schema'
 *
 *         photos:
 *           $ref: '#/components/propertyParameters/photos/schema'
 *
 *         rating:
 *           allOf:
 *             - $ref: '#/components/propertyParameters/rating/schema'
 *             - readOnly: true
 *
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
 *   Location:
 *     type: object
 *     properties:
 *        _id:
 *          type: object
 *          properties:
 *               city:
 *                   $ref: '#/components/propertyParameters/city/schema'
 *               province:
 *                   $ref: '#/components/propertyParameters/province/schema'
 *               country:
 *                   $ref: '#/components/propertyParameters/country/schema'
 *        count:
 *           type: number
 *           description: The number of properties in this location
 *           example: 5
 */
