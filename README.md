# Rest-Inn API Documentation
This is the documentation for the Rest-Inn API. Currently, the API is in a very early stage of development.

## Getting Started

- Clone the repository: `git clone git@github.com:416rehman/Rest-Inn.git`
- Update the `.env` file with your MongoURL and a secret for JWTs.
- Run `npm install`
- Run `npm start`
- Open the browser and go to `http://localhost:8080/` to see the API endpoints.


## Endpoints
**This list may not be complete. Use the root path of the API `http://localhost:8080/` for a more recent list.**
<table class="table table-bordered table-hover table-condensed">
<thead><tr><th title="Field #1">url</th>
<th title="Field #2">method</th>
<th title="Field #3">secured</th>
<th title="Field #4">description</th>
</tr></thead>
<tbody><tr>
<td>/users</td>
<td>get</td>
<td>false</td>
<td>Get all users</td>
</tr>
<tr>
<td>/users/:username</td>
<td>get</td>
<td>false</td>
<td>Get user by id</td>
</tr>
<tr>
<td>/users</td>
<td>post</td>
<td>false</td>
<td>Create a new user</td>
</tr>
<tr>
<td>/users/:username</td>
<td>put</td>
<td>false</td>
<td>Update user by id</td>
</tr>
<tr>
<td>/properties</td>
<td>get</td>
<td>false</td>
<td>Get all properties</td>
</tr>
<tr>
<td>/properties/types</td>
<td>get</td>
<td>false</td>
<td>Get all property types</td>
</tr>
<tr>
<td>/properties/types/:type</td>
<td>get</td>
<td>false</td>
<td>Get all properties by type</td>
</tr>
<tr>
<td>/properties/locations</td>
<td>get</td>
<td>false</td>
<td>Get all locations</td>
</tr>
<tr>
<td>/properties/locations/:location</td>
<td>get</td>
<td>false</td>
<td>Get all properties by location</td>
</tr>
<tr>
<td>/properties/bestselling</td>
<td>get</td>
<td>false</td>
<td>Get all best-selling properties</td>
</tr>
<tr>
<td>/properties/:id</td>
<td>get</td>
<td>false</td>
<td>Get a single property</td>
</tr>
<tr>
<td>/properties</td>
<td>post</td>
<td>false</td>
<td>Create a new property</td>
</tr>
<tr>
<td>/properties/:id</td>
<td>put</td>
<td>false</td>
<td>Update a property</td>
</tr>
<tr>
<td>/properties/:id</td>
<td>delete</td>
<td>false</td>
<td>Delete a property</td>
</tr>
</tbody></table>