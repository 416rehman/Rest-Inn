
/**
 * @swagger
 * components:
 *   propertyParameters:
 *      id:
 *        name: id
 *        schema:
 *          description: The id of the property object
 *          type: string
 *          readOnly: true
 *
 *      title:
 *        name: title
 *        schema:
 *          description: The title of the property object
 *          type: string
 *          format: string
 *          example: "My title for this property"
 *
 *      description:
 *        name: description
 *        schema:
 *          description: The description of the property object
 *          type: string
 *          format: string
 *          example: "My description for this property"
 *
 *      price:
 *        name: price
 *        schema:
 *          description: The price of the property
 *          type: integer
 *          format: double
 *          minimum: 0
 *          maximum: 100
 *
 *      bedrooms:
 *        name: bedrooms
 *        schema:
 *          description: The number of bedrooms in the property
 *          type: number
 *          format: integer
 *          minimum: 0
 *          maximum: 10
 *
 *      beds:
 *        name: beds
 *        schema:
 *          description: The number of beds in the property
 *          type: number
 *          format: integer
 *          minimum: 1
 *          maximum: 10
 *
 *      baths:
 *        name: baths
 *        schema:
 *          description: The number of baths in the property
 *          type: number
 *          format: integer
 *          minimum: 1
 *          maximum: 10
 *
 *      type:
 *        name: type
 *        schema:
 *          description: The type of the property
 *          allOf:
 *            - type: string
 *            - $ref: '#/components/enums/propertyTypesEnum'
 *
 *      unit:
 *        name: unit
 *        schema:
 *          type: string
 *          description: The unit of the property
 *          example: A
 *          
 *      street:
 *        name: street
 *        schema:
 *          type: string
 *          description: The street of the property
 *          example: 123 Main St
 *          
 *      city:
 *        name: city
 *        schema:
 *          description: The city of the property (case insensitive) - part of the location sub-object
 *          type: string
 *
 *      province:
 *        name: province
 *        schema:
 *          description: The province of the property (case insensitive) - part of the location sub-object
 *          type: string
 *
 *      country:
 *        name: country
 *        schema:
 *          description: The country of the property (case insensitive) - part of the location sub-object
 *          type: string
 *
 *      postalCode:
 *        name: postalCode
 *        schema:
 *          description: The postal code of the property (case insensitive) - part of the location sub-object
 *          type: string
 *          
 *      rules:
 *        name: rules
 *        schema:
 *          description: The rules of the property
 *          type: array
 *          items:
 *              type: string
 *              description: The rule of the property
 *             
 *      amenities:
 *        name: amenities
 *        schema:
 *          description: The amenities of the property
 *          type: array
 *          items:
 *             type: string
 *             $ref: '#/components/enums/amenitiesEnum'
 *
 *      listingType:
 *        name: listingType
 *        schema:
 *          description: The listing type of the property
 *          schema:
 *            allOf:
 *              - type: string
 *              - $ref: '#/components/enums/listingTypesEnum'
 *
 *
 *      bestSeller:
 *        name: bestSeller
 *        schema:
 *          description: Whether the property is best seller or not
 *          type: boolean
 *          readOnly: true
 *
 *      thumbnail:
 *        name: thumbnail
 *        schema:
 *          description: The thumbnail of the property
 *          type: string
 *          format: url
 *          example: "https://www.example.com/thumbnail.jpg"
 *
 *      photos:
 *        name: photos
 *        schema:
 *          description: The photos of the property
 *          type: array
 *          items:
 *            type: string
 *            format: url
 *            example: "https://www.example.com/photo.jpg"
 *
 *      averageRating:
 *        name: averageRating
 *        schema:
 *          description: The averageRating of the property
 *          type: number
 *          format: double
 *          minimum: 0
 *          maximum: 5
 *          readOnly: true
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
 *      bedroomsMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bedrooms'
 *              - in: query
 *              - name: bedroomsMin
 *              - description: The minimum number of bedrooms in the property
 *      bedroomsMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/bedrooms'
 *              - in: query
 *              - name: bedroomsMax
 *              - description: The maximum number of bedrooms in the property
 *      type:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/type'
 *              - in: query
 *      unit:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/unit'
 *              - in: query
 *      listingType:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/listingType'
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
 *      ratingMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/averageRating'
 *              - in: query
 *      ratingMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/averageRating'
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
 *      ratingMin:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/averageRating'
 *              - in: path
 *              - name: ratingMin
 *              - description: The minimum averageRating of the property
 *      ratingMax:
 *          allOf:
 *              - $ref: '#/components/propertyParameters/averageRating'
 *              - in: path
 *              - name: ratingMax
 *              - description: The maximum averageRating of the property
 */