/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

module.exports.propertyTypes = [
    'house',
    'apartment',
    'condo',
    'townhouse',
    'duplex',
    'cabin',
    'villa',
    'farm',
    'beach house',
    'loft',
    'other'
];

/**
 * @swagger
 *   components:
 *     enums:
 *       propertyTypesEnum :
 *         enum:
 *            - 'house'
 *            - 'apartment'
 *            - 'condo'
 *            - 'townhouse'
 *            - 'duplex'
 *            - 'cabin'
 *            - 'villa'
 *            - 'farm'
 *            - 'beach house'
 *            - 'loft'
 *            - 'other'
 */

module.exports.amenities = [
    //Atmosphere
    'patio or balcony',
    'hot tub',
    'garden',
    'pool',

    //bathroom
    'shower',
    'bathtub',
    'hair dryer',
    'shampoo',

    //laundry and bedroom
    'iron',
    'laundry',
    'dryer',
    'hangers',
    'linens',

    //heating and cooling
    'heating',
    'air conditioning',
    'fireplace',

    //internet and entertainment
    'wifi',
    'tv',

    //safety
    'smoke detector',
    'carbon monoxide detector',
    'carbon dioxide detector',
    'first aid kit',
    'fire extinguisher',

    //facilities
    'elevator',

    //services
    'self check-in',
    'keypad',
    'doorman',

    //kitchen and dining
    'cooking pots or pans',
    'dishes and silverware',
    'microwave',
    'refrigerator',
    'stove',
    'oven',
    'dishwasher',
    'toaster',
    'coffee maker',
]

/**
 * @swagger
 * components:
 *   enums:
 *     amenitiesEnum:
 *        enum:
 *          - 'elevator'
 *          - 'patio or balcony'
 *          - 'hot tub'
 *          - 'garden'
 *          - 'pool'
 *
 *          - 'shower'
 *          - 'bathtub'
 *          - 'hair dryer'
 *          - 'shampoo'
 *
 *          - 'iron'
 *          - 'laundry'
 *          - 'dryer'
 *          - 'hangers'
 *          - 'linens'
 *
 *          - 'heating'
 *          - 'air conditioning'
 *          - 'fireplace'
 *
 *          - 'wifi'
 *          - 'tv'
 *
 *          - 'smoke detector'
 *          - 'carbon monoxide detector'
 *          - 'carbon dioxide detector'
 *          - 'first aid kit'
 *          - 'fire extinguisher'
 *
 *          - 'elevator'
 *
 *          - 'self check-in'
 *          - 'keypad'
 *          - 'doorman'
 *
 *          - 'cooking pots or pans'
 *          - 'dishes and silverware'
 *          - 'microwave'
 *          - 'refrigerator'
 *          - 'stove'
 *          - 'oven'
 *          - 'dishwasher'
 *          - 'toaster'
 *          - 'coffee maker'
 */

module.exports.listingTypes = ['entire place', 'hotel room' ,'private room', 'shared room'];

/**
 * @swagger
 *  components:
 *      enums:
 *          listingTypesEnum:
 *              enum:
 *                  - 'entire place'
 *                  - 'hotel room'
 *                  - 'private room'
 *                  - 'shared room'
 */