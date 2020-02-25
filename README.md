# Routes

## Users

- GET /users/ => Get all users
- POST /users/ => Create a new user
- GET /users/:id => Get a user
- PATCH /users/:id => Update a user
- DELETE /users/:id => Delete a user (should also delete his collections)
- GET /users/:id/collections/ => Get all collections from a specific user

## Assets

- GET /assets/ => Get all assets
- POST /assets/ => Create a new asset
- GET /assets/:id => Get an asset
- PATCH /assets/:id => Update an asset
- DELETE /assets/:id => Delete an asset (should remove the reference in the related collections)
- GET /assets/search => Search for asset(s) based on multiple search parameters passed as URL query parameters. Ex: /assets/search?meta_brand=Orangina,Schweppes&fields=name,url,meta_brand,meta_recipe,meta_flavour,meta_packaging,meta_capacity&sort=-meta_brand&limit=12

## Tags

- GET /tags/ => Get all tags
- POST /tags/ => Create a new tag
- GET /tags/:id => Get a tag
- PATCH /tags/:id => Update a tag
- DELETE /tags/:id => Delete a tag (should remove the reference in the related assets)
- GET /tags/search/query => Search for tags(s) based on name

## Collections

- GET /collections/ => Get all collections
- POST /collections/ => Create a new collection
- GET /collections/:id => Get a collection
- PATCH /collections/:id => Update a collection
- DELETE /collections/:id => Delete a collection
- GET /collections/search => Search for collection(s) based on name

## Authentication

TODO in authentication.route.js:

- /register
- /login
- /logout
- /reset-password
- /is-logged-in
