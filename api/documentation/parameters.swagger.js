
/**
 * @swagger
 * components:
 *   parameters:
 *      id:
 *        name: id
 *        in: path
 *        description: The id of the object
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *          example: 61ef5a19af727a24c31522e3
 *
 *      price_min:
 *        name: price_min
 *        description: The minimum price of the property
 *        schema:
 *          type: number
 *          format: double
 *          example: 100
 *          minimum: 0
 *          maximum: 1000000
 *
 *      price_max:
 *        name: price_max
 *        description: The maximum price of the property
 *        schema:
 *          type: number
 *          format: double
 *          example: 100
 *          minimum: 0
 *          maximum: 1000000
 *
 *      beds_min:
 *        name: beds_min
 *        description: The minimum number of beds in the property
 *        schema:
 *          type: number
 *          format: double
 *          example: 1
 *          minimum: 1
 *          maximum: 10
 *
 *      beds_max:
 *        name: beds_max
 *        description: The maximum number of beds in the property
 *        schema:
 *          type: number
 *          format: double
 *          example: 1
 *          minimum: 1
 *          maximum: 10
 *
 *      baths_min:
 *        name: baths_min
 *        description: The minimum number of baths in the property
 *        schema:
 *          type: number
 *          format: integer
 *          example: 1
 *          minimum: 1
 *          maximum: 10
 *
 *      baths_max:
 *        name: baths_max
 *        description: The maximum number of baths in the property
 *        schema:
 *          type: number
 *          format: integer
 *          example: 1
 *          minimum: 1
 *          maximum: 10
 *
 *      type:
 *        name: type
 *        description: The type of the property
 *        schema:
 *          allOf:
 *            - type: string
 *            - example: house
 *            - $ref: '#/components/enums/propertyTypesEnum'
 *
 *      city:
 *        name: city
 *        description: The city of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *          example: 'San Francisco'
 *
 *      province:
 *        name: province
 *        description: The province of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *          example: 'Ontario'
 *
 *      country:
 *        name: country
 *        description: The country of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *          example: 'Canada'
 *
 *      postal_code:
 *        name: postal_code
 *        description: The postal code or ZIP code of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *          example: 'M5V 2C6'
 *
 *      amenities:
 *        name: amenities
 *        description: The amenities of the property
 *        schema:
 *          type: array
 *          items:
 *              allOf:
 *                - type: string
 *                - example: 'wifi'
 *                - $ref: '#/components/enums/amenitiesEnum'
 *      best_seller:
 *        name: best_seller
 *        description: Whether the property is best seller or not
 *        schema:
 *          type: boolean
 *          example: true
 */

/**
 * @swagger
 * components:
 *  queryParameters:
 *      price_min:
 *          allOf:
 *              - $ref: '#/components/parameters/price_min'
 *              - in: query
 *      price_max:
 *          allOf:
 *              - $ref: '#/components/parameters/price_max'
 *              - in: query
 *      beds_min:
 *          allOf:
 *              - $ref: '#/components/parameters/beds_min'
 *              - in: query
 *      beds_max:
 *          allOf:
 *              - $ref: '#/components/parameters/beds_max'
 *              - in: query
 *      baths_min:
 *          allOf:
 *              - $ref: '#/components/parameters/baths_min'
 *              - in: query
 *      baths_max:
 *          allOf:
 *              - $ref: '#/components/parameters/baths_max'
 *              - in: query
 *      type:
 *          allOf:
 *              - $ref: '#/components/parameters/type'
 *              - in: query
 *      city:
 *          allOf:
 *              - $ref: '#/components/parameters/city'
 *              - in: query
 *      province:
 *          allOf:
 *              - $ref: '#/components/parameters/province'
 *              - in: query
 *      country:
 *          allOf:
 *              - $ref: '#/components/parameters/country'
 *              - in: query
 *      postal_code:
 *          allOf:
 *              - $ref: '#/components/parameters/postal_code'
 *              - in: query
 *      amenities:
 *          allOf:
 *              - $ref: '#/components/parameters/amenities'
 *              - in: query
 *      best_seller:
 *          allOf:
 *              - $ref: '#/components/parameters/best_seller'
 *              - in: query
 *
 */

/**
 * @swagger
 * components:
 *   pathParameters:
 *      id:
 *          allOf:
 *              - $ref: '#/components/parameters/id'
 *              - in: path
 *              - required: true
 *      location:
 *            name: location
 *            in: path
 *            description: The city, province, or country of the property (case insensitive)
 *            schema:
 *              type: string
 *              example: 'Toronto'
 *            required: true
 */

