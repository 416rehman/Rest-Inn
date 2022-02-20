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
 *           allOf:
 *             - $ref: '#/definitions/Property/properties/_id'
 *             - readOnly: true
 *
 *         title:
 *           allOf:
 *             - $ref: '#/definitions/Property/properties/title'
 *             - required: true
 *
 *         price:
 *           allOf:
 *             - $ref: '#/definitions/Property/properties/price'
 *             - required: true
 *
 *         description:
 *           $ref: '#/components/propertyParameters/description'
 *
 *         type:
 *            allOf:
 *              - $ref: '#/definitions/Property/properties/type'
 *              - required: true
 *         listingType:
 *            allOf:
 *              - $ref: '#/definitions/Property/properties/listingType'
 *              - required: true
 *         bedrooms:
 *            allOf:
 *              - $ref: '#/definitions/Property/properties/bedrooms'
 *              - required: true
 *         beds:
 *            allOf:
 *              - $ref: '#/definitions/Property/properties/beds'
 *              - required: true
 *
 *         baths:
 *            allOf:
 *              - $ref: '#/definitions/Property/properties/baths'
 *              - required: true
 *
 *         rules:
 *           $ref: '#/components/propertyParameters/rules'
 *
 *         amenities:
 *           $ref: '#/components/propertyParameters/amenities'
 *
 *         listingType: $ref:'#/components/propertyParameters/listingType'
 *
 *         location:
 *           type: object
 *           description: The location of the property
 *           properties:
 *               unit:
 *                   $ref: '#/components/propertyParameters/unit'
 *               street:
 *                   $ref: '#/components/propertyParameters/street'
 *               city:
 *                   $ref: '#/components/propertyParameters/city'
 *               province:
 *                   $ref: '#/components/propertyParameters/province'
 *               country:
 *                   $ref: '#/components/propertyParameters/country'
 *               postalCode:
 *                   $ref: '#/components/propertyParameters/postalCode'
 *               _id:
 *                   allOf:
 *                       - $ref: '#/components/propertyParameters/id'
 *                       - description: The id of the location
 *                       - readOnly: true
 *           required: true
 *
 *         bestSeller:
 *           allOf:
 *               - $ref: '#/components/propertyParameters/bestSeller'
 *               - readOnly: true
 *
 *         thumbnail:
 *           $ref: '#/components/propertyParameters/thumbnail'
 *
 *         photos:
 *           $ref: '#/components/propertyParameters/photos'
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
 *                   type: string
 *                   description: The city of the location
 *                   example: Toronto
 *               province:
 *                   type: string
 *                   description: The province of the location
 *                   example: Ontario
 *               country:
 *                   type: string
 *                   description: The country of the location
 *                   example: Canada
 *        count:
 *           type: number
 *           description: The number of properties in this location
 *           example: 5
 */
