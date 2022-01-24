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

/**
 * Retrieves all the properties in the database
 */
router.get('/', (req, res) => {
     res.json({
         message: 'Welcome to the properties API!'
     });
 });

/**
 * Retrieves all property types in the database
 */
router.get('/types', (req, res) => {
    res.json({
        message: 'Welcome to the property categories API!'
    });
});

/**
 * Retrieves all the properties by type in the database
 */
router.get('/types/:type', (req, res) => {
    res.json({
        message: 'Welcome to the properties by category API!'
    });
});

/**
 * Retrieves all the properties in the database by location
 * Searches the location query string in the city, province, and country fields
 */
router.get('/location/:location', (req, res) => {
    res.json({
        message: 'Welcome to the properties by location API!'
    });
});

/**
 * Retrieves all best selling properties in the database
 */
router.get('/bestselling', (req, res) => {
    res.json({
        message: 'Welcome to the best selling properties API!'
    });
});

/**
 * Retrieves a single property from the database
 */
 router.get('/:id', (req, res) => {
     res.json({
         message: 'Welcome to the properties API!'
     });
 });

 /**
  * Creates a new property in the database
  */
 router.post('/', (req, res) => {
     res.json({
         message: 'Welcome to the properties API!'
     });
 });

 /**
  * Updates a property in the database
  */
 router.put('/:id', (req, res) => {
     res.json({
         message: 'Welcome to the properties API!'
     });
 });

 /**
  * Deletes a property from the database
  */
 router.delete('/:id', (req, res) => {
     res.json({
         message: 'Welcome to the properties API!'
     });
 });



