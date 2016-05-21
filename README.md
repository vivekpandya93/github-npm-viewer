
# github-npm-viewer
NPM issue viewer using Angular.JS, Node.JS 

After you've got the files, ensure the following commands are run in the project root:

```bash
npm install
```

```bash
gulp build
```

If you do not have `gulp` installed on your machine, install it using `npm install -g gulp`.

## MongoDB database - this was used to store the users 

Finally, the generated project assumes a running MongoDB database on port `27017` (the default MongoDB port).

The technologies used are: 

#Server: 
Express - It begins in `/server/app/index.js`
It uses the following third-party middleware:

## [serve-favicon](https://github.com/expressjs/serve-favicon)

If the request URL is /favicon.ico, serve up the favicon.

## [cookie-parser](https://github.com/expressjs/cookie-parser)

Parses the cookie string included in requests and places an object on `req.cookies`.

## [body-parser](https://github.com/expressjs/body-parser)

Parses any request body attached to a `POST` or `PUT` request and places it on `req.body`.

## [express-session](https://github.com/expressjs/session)

Creates and reads session cookies for user identification between requests. Places information on `req.session`. It uses [connect-mongo](https://github.com/kcbanner/connect-mongo) to persist session information.

## [passport](https://github.com/jaredhanson/passport)

Used for authenticating and controlling authorization in routing.  [passport-github](https://github.com/jaredhanson/passport-github)

# MongoDB and Mongoose

In the program's database initialization ([server/db/index.js](https://github.com/FullstackAcademy/fsg/blob/master/generated/server/db/index.js)), a connection is established to a MongoDB database running on port 27017. The database URI comes from the environment configuration.

Generated also is a simple `User` model that has an `email` field and other fields for basic authentication (`password`/`salt`, `github.id`). This model is registered in ([server/db/index.js]

