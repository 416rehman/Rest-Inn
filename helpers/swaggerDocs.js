const SwaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['routes/*.routes.js'], // files containing annotations as above
};

const openapiSpecification = SwaggerJSDoc(options);
console.log(openapiSpecification);
module.exports = openapiSpecification;