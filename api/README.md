# Rest-Inn API Documentation
This is the documentation for the Rest-Inn API. Currently, the API is in a very early stage of development.

## Getting Started

- Clone the repository: `git clone git@github.com:416rehman/Rest-Inn.git`
- Update the `.env` file with your MongoURL and a secret for JWTs.
- Run `npm install`
- Run `npm start`
- Open the browser and go to the root path to see the API endpoints. Live version: `https://rest-inn.herokuapp.com/`


## Endpoints
**This list may not be complete. Use the root path of the API `https://rest-inn.herokuapp.com/` for a more recent list.**
```
| method | url                             | secured | description                     |
|--------|---------------------------------|---------|---------------------------------|
| get    | /users                          | false   | Get all users                   |
| get    | /users/:username                | false   | Get user by id                  |
| post   | /users                          | false   | Create a new user               |
| put    | /users/:username                | false   | Update user by id               |
| get    | /properties                     | false   | Get all properties              |
| get    | /properties/types               | false   | Get all property types          |
| get    | /properties/types/:type         | false   | Get all properties by type      |
| get    | /properties/locations           | false   | Get all locations               |
| get    | /properties/locations/:location | false   | Get all properties by location  |
| get    | /properties/bestselling         | false   | Get all best-selling properties |
| get    | /properties/:id                 | false   | Get a single property           |
| post   | /properties                     | false   | Create a new property           |
| put    | /properties/:id                 | false   | Update a property               |
| delete | /properties/:id                 | false   | Delete a property               |

```