
# github-npm-viewer
NPM issue viewer using Angular.JS, Node.JS 

This is an application that views all the open issues in the npm repository on github (https://github.com/npm/npm/issues)

** to over-ride the 60 requests/hour limit - I used the github oauth to authenticate all requests 


ensure the following commands are run in the project root:

```bash
npm install
```

```bash
gulp build
```

If  `gulp` installed on your machine,  `npm install -g gulp`.

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

# Front-end 
The front-end application generated has exactly four dependencies:

## [Angular](https://angularjs.org/)

## [SCSS] (http://sass-lang.com/)
An extension of CSS that adds power and elegance to the basic language. 

## [angular-ui-router](https://github.com/angular-ui/ui-router)

Used for managing different application states (can be thought of as "pages") for the front-end application. 

## [bootstrap](http://getbootstrap.com/)

Used for general styling and UI components.

## [angular-ui-bootstrap](http://getbootstrap.com/)

Angular-specific implementation of Bootstrap's UI elements. Used for pagination and modal

# Gulp:

`gulpfile.js` establishes a number of tasks to be run in both development and production environments. Examples of what these tasks do:

- On save to a file in `browser/js`, concatenate all of your front-end Javascript files, save that file into `public`, reload browser.
- On save to a file in `browser/scss`, compile `browser/scss/main.scss`, save file into `public`, reload browser.

run ```gulp```

