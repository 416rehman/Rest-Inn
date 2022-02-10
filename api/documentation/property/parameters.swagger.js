
/**
 * @swagger
 * components:
 *   propertyParameters:
 *      id:
 *        name: id
 *        description: The id of the object
 *        schema:
 *          type: string
 *          format: string
 *
 *      title:
 *        name: title
 *        description: The title of the object
 *        schema:
 *          type: string
 *          format: string
 *          example: "My title for this property"
 *
 *      description:
 *        name: description
 *        description: The description of the object
 *        schema:
 *          type: string
 *          format: string
 *          example: "My description for this property"
 *
 *      price:
 *        name: price
 *        description: The price of the property
 *        schema:
 *          type: number
 *          format: double
 *          minimum: 0
 *          maximum: 100
 *
 *      beds:
 *        name: bedsMin
 *        description: The minimum number of beds in the property
 *        schema:
 *          type: number
 *          format: double
 *          minimum: 1
 *          maximum: 10
 *
 *      baths:
 *        name: bathsMin
 *        description: The minimum number of baths in the property
 *        schema:
 *          type: number
 *          format: integer
 *          minimum: 1
 *          maximum: 10
 *
 *      type:
 *        name: type
 *        description: The type of the property
 *        schema:
 *          allOf:
 *            - type: string
 *            - $ref: '#/components/enums/propertyTypesEnum'
 *
 *      unit:
 *          type: string
 *          description: The unit of the property
 *          example: A
 *          
 *      street:
 *          type: string
 *          description: The street of the property
 *          example: 123 Main St
 *          
 *      city:
 *        name: city
 *        description: The city of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *
 *      province:
 *        name: province
 *        description: The province of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *
 *      country:
 *        name: country
 *        description: The country of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *
 *      postalCode:
 *        name: postalCode
 *        description: The postal code or ZIP code of the property (case insensitive) - part of the location sub-object
 *        schema:
 *          type: string
 *          
 *      rules:
 *         type: array
 *         description: The rules of the property
 *         items:
 *             type: string
 *             description: The rule of the property
 *             
 *      amenities:
 *        name: amenities
 *        description: The amenities of the property
 *        schema:
 *          type: array
 *          items:
 *              allOf:
 *                - type: string
 *                - $ref: '#/components/enums/amenitiesEnum'
 *
 *      bestSeller:
 *        name: bestSeller
 *        description: Whether the property is best seller or not
 *        schema:
 *          type: boolean
 *
 *      thumbnail:
 *        name: thumbnail
 *        description: The thumbnail of the property
 *        schema:
 *          type: string
 *          format: url
 *          example: "https://www.example.com/thumbnail.jpg"
 *
 *      photos:
 *        name: photos
 *        description: The photos of the property
 *        schema:
 *          type: array
 *          items:
 *              type: string
 *              format: url
 *              example: "https://www.example.com/photo.jpg"
 *
 */

/**
 * @swagger
 * components:
 *  propertyQueryParameters:
 *      id:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/id'
 *              - in: query
 *      price:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/price'
 *              - in: query
 *      priceMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/price'
 *              - in: query
 *              - name: priceMin
 *              - description: The minimum price of the property
 *      priceMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/price'
 *              - in: query
 *              - name: priceMax
 *              - description: The maximum price of the property
 *      beds:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/beds'
 *              - in: query
 *      bedsMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/beds'
 *              - in: query
 *              - name: bedsMin
 *              - description: The minimum number of beds in the property
 *      bedsMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/beds'
 *              - in: query
 *              - name: bedsMax
 *              - description: The maximum number of beds in the property
 *      baths:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/baths'
 *              - in: query
 *      bathsMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/baths'
 *              - in: query
 *              - name: bathsMin
 *              - description: The minimum number of baths in the property
 *      bathsMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/baths'
 *              - in: query
 *              - name: bathsMax
 *              - description: The maximum number of baths in the property
 *      type:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/type'
 *              - in: query
 *      unit:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/unit'
 *              - in: query
 *      street:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/street'
 *              - in: query
 *      city:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/city'
 *              - in: query
 *      province:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/province'
 *              - in: query
 *      country:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/country'
 *              - in: query
 *      postalCode:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/postalCode'
 *              - in: query
 *      amenities:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/amenities'
 *              - in: query
 *      bestSeller:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bestSeller'
 *              - in: query
 */

/**
 * @swagger
 * components:
 *   propertyPathParameters:
 *      id:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/id'
 *              - in: path
 *      priceMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/priceMin'
 *              - in: path
 *      priceMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/priceMax'
 *              - in: path
 *      bedsMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bedsMin'
 *              - in: path
 *      bedsMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bedsMax'
 *              - in: path
 *      bathsMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bathsMin'
 *              - in: path
 *      bathsMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bathsMax'
 *              - in: path
 *      type:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/type'
 *              - in: path
 *      unit:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/unit'
 *              - in: path
 *      street:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/street'
 *              - in: path
 *      city:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/city'
 *              - in: path
 *      province:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/province'
 *              - in: path
 *      country:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/country'
 *              - in: path
 *      postalCode:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/postalCode'
 *              - in: path
 *      amenities:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/amenities'
 *              - in: path
 *      bestSeller:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bestSeller'
 *              - in: path
 *      location:
 *            name: location
 *            in: path
 *            description: The city, province, or country of the property (case insensitive)
 *            schema:
 *              type: string
 */