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
Use the root path of the API `https://rest-inn.herokuapp.com/` to browse and interact with all the endpoints
