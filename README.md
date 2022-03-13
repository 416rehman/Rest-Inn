# Rest-Inn Documentation
<div align="center">
	<a href='https://rest-inn.herokuapp.com/'><img src="https://img.shields.io/badge/Live-API-blueviolet?logo=heroku" alt="Live - Demo"></a>
	<a href='https://admiring-galileo-50827b.netlify.app/'><img src="https://img.shields.io/badge/Live-Client-2ea44f" alt="Course - WEB322"></a>
</div>

Rest-Inn is a simple attempt at recreating the functionality of the [AirBnB](https://airbnb.com/) as a project for the WEB422 course in Seneca College.

**There are 2 components to this:** Client and API

The API can be explored and interacted with at [https://rest-inn.herokuapp.com/](https://rest-inn.herokuapp.com/) and is documented using swagger.

The Client is a simple web application that interacts with the API to provide the functionality of airbnb, and it can be found at [https://rest-inn-client.herokuapp.com/](https://rest-inn-client.herokuapp.com/)
## Getting Started

1. go to the api folder and run the `npm install` command
2. run `node .` to start the api server at **localhost:8080**
3. go to the client folder and run the `npm install` command
4. run `npm run start` to start the client and view at **localhost:3000**

### Testing:
1. Go to /signup on frontend and create an account
2. Login at /login using the created account
3. Browse the listings at /listings
4. Book a listing by clicking a listing, and adding the checkin and checkout dates to book
5. View your bookings at /bookings
6. Create your own listing at /listings/new
7. View all your listings and upcoming guests at /hosting
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