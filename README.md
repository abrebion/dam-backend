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
- GET /assets/:id => Get a asset
- PATCH /assets/:id => Update a asset
- DELETE /assets/:id => Delete a asset (should remove the reference in the related collections)

## Tags

- GET /tags/ => Get all tags
- POST /tags/ => Create a new tag
- GET /tags/:id => Get a tag
- PATCH /tags/:id => Update a tag
- DELETE /tags/:id => Delete a tag (should remove the reference in the related assets)

## Collections

- GET /collections/ => Get all collections
- POST /collections/ => Create a new collection
- GET /collections/:id => Get a collection
- PATCH /collections/:id => Update a collection
- DELETE /collections/:id => Delete a collection (should remove the reference in the related assets)
