/**
 * @swagger
 * components:
 *  bookingParameters:
 *      id:
 *          name: id
 *          schema:
 *              type: string
 *              description: The id of the booking
 *              readOnly: true
 *      forHosts:
 *          name: forHosts
 *          schema:
 *              type: boolean
 *              description: "Whether the booking is for hosts or not - True: Will find all bookings by other users for the user(host), false: Will find all bookings by the user"
 *              default: false
 *
 *      user:
 *          name: user
 *          schema:
 *              type: string
 *              description: The id of the reserving user
 *              readOnly: true
 *              required: true
 *
 *      property:
 *          name: property
 *          schema:
 *              type: string
 *              description: The id of the property
 *              readOnly: true
 *
 *      checkIn:
 *          name: checkIn
 *          schema:
 *              type: string
 *              description: The check in date
 *              readOnly: true
 *              format: date
 *
 *      checkOut:
 *          name: checkOut
 *          schema:
 *              type: string
 *              description: The check out date
 *              readOnly: true
 *              format: date
 *
 *      adults:
 *          name: adults
 *          schema:
 *             type: integer
 *             description: The number of adults
 *             readOnly: true
 *             minimum: 1
 *             maximum: 100
 *
 *      children:
 *          name: children
 *          schema:
 *             type: integer
 *             description: The number of children
 *             readOnly: true
 *             minimum: 0
 *             maximum: 5
 *
 *      infants:
 *          name: infants
 *          schema:
 *             type: integer
 *             description: The number of infants
 *             readOnly: true
 *             minimum: 0
 *             maximum: 5
 *
 *      pets:
 *          name: pets
 *          schema:
 *             type: integer
 *             description: The number of pets
 *             readOnly: true
 *             minimum: 0
 *             maximum: 5
 *
 *      price:
 *          name: price
 *          schema:
 *             type: number
 *             description: The total price of the booking
 *             readOnly: true
 *             default: 0.0
 *
 *      status:
 *          name: status
 *          schema:
 *             type: string
 *             description: The status of the booking
 *             readOnly: true
 *             example: PENDING
 *             default: PENDING
 *             $ref: "#/components/enums/bookingStatusEnum"
 *
 *      rating:
 *          name: rating
 *          schema:
 *             type: number
 *             description: The rating of the booking - only if the booking is completed
 *             default: 0.0
 *             minimum: 0.0
 *             maximum: 5.0
 *             multipleOf: 0.5
 *
 *      review:
 *          name: review
 *          schema:
 *             type: string
 *             description: The review of the booking - only if the booking is completed
 *             default: ""
 *             maxLength: 500
 */

/**
 * @swagger
 * components:
 *  bookingQueryParameters:
 *      id:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/id'
 *              - in: query
 *      forHosts:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/forHosts'
 *              - in: query
 *      user:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/user'
 *              - in: query
 *
 *      property:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/property'
 *              - in: query
 *
 *      checkIn:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/checkIn'
 *              - in: query
 *
 *      checkOut:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/checkOut'
 *              - in: query
 *
 *      adultsMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/adults'
 *              - in: query
 *              - description: The minimum number of adults
 *
 *      adultsMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/adults'
 *              - in: query
 *              - description: The maximum number of adults
 *
 *      childrenMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/children'
 *              - in: query
 *              - description: The minimum number of children
 *
 *      childrenMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/children'
 *              - in: query
 *              - description: The maximum number of children
 *
 *      infantsMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/infants'
 *              - in: query
 *              - description: The minimum number of infants
 *
 *      infantsMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/infants'
 *              - in: query
 *              - description: The maximum number of infants
 *
 *      petsMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/pets'
 *              - in: query
 *              - description: The minimum number of pets
 *
 *      petsMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/pets'
 *              - in: query
 *              - description: The maximum number of pets
 *
 *      status:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/status'
 *              - in: query
 *
 *      ratingMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/rating'
 *              - in: query
 *              - description: The minimum rating
 *
 *      ratingMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/rating'
 *              - in: query
 *              - description: The maximum rating
 *
 *      review:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/review'
 *              - in: query
 *
 *      priceMin:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/price'
 *              - in: query
 *              - description: The minimum price
 *
 *      priceMax:
 *          allOf:
 *              - $ref: '#/components/bookingParameters/price'
 *              - in: query
 *              - description: The maximum price
 */

/**
 * @swagger
 * components:
 *   bookingPathParameters:
 *      id:
 *          name: id
 *          in: path
 *          description: The id of the booking
 *          required: true
 */