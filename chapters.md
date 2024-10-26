Chapter: 16: CREATING OUR EXPRESS SERVER
-create a repo
-Initialize a repo
-node_modules, package.json, package-lock.json
-install express
-create a server
-listen to port 
-write req handler for /test and more router api
-install nodemon and config script in package.json
-diff. bet dependency vs dev-dependency
-version precedence like caret(^), tilde(~) or none
-what is the use of -g while npm install


Chapter: 17: ROUTING AND REQUEST HANDLER
-play with different router
-try to implement /hello and /hello/2 and find some key points
-order of router is very important and matter alots = specially in use method
-install postman and make a get hello router request
-http method: get, post, delete, put, patch, use etc.
-must explore->  https://expressjs.com/en/guide/routing.html
- diff bt req.params vs req.query
- use of *, +, ?, () 
- regex in route path
- reading the dynamic routes


Chapter: 18: MIDDLEWARE AND ERROR HANDLERS
- multiple route handlers
- next()
- next function and error along with res.send()
- app.use("/route", rh1, rh2, rh3, rh4, ...)
- router handler: array
 eg. app.use("/route", [rh1, rh2], rh3, rh4, ...) -=- this is same as aboves

 - what is middleware
 - how express js basically handles requests behind the scene
 - write a dummy auth middleware for admin
 - write a dummy auth middleware for all user except user/login 

 - error handling using app.use('/', (err, req, res, next) = {})



Chapter: 19: DATABASE, SCHEMA AND MODELS MONGOOSE
- create a cluster on mongoDB official website
- install mongoose lib
- connect your application to the db  -devTinder
- call the connectDB function and connect before listing to the port(very imp).

- create a userSchema and user model

- create POST /signup API to add data to database(collection)
- push some document using api calls from postman
- use try and catch while saving data into tha db collection -> always do error handling 



CHAPTER 20: DIVING INTO THE API
- js object vs json 
- add the express.json middleware 
- make signup api dynamic to receive data from the end user

- findOne -> which document send if there is a duplicate documents present in the same collection
- API - get user by email
- API - feed api -> get /feed - get all the user from the collection users

- create a delete user API
- create delete api
- diff bt patch vs put


CHAPTER: 21: DATA SANITIZATION AND SCHEMA VALIDATIONS
 - explore schematypes options from documentation
 - add require, unique, lowercase, min, minLength, trim
 - add default
 - create a custom validation function for input
 - improve db schema - put all approriate validation on each field in schema
 - add timestamps to the userSchema 

 - add api level validation on patch request & signup post api
 - add api validation for each field

 - install validator library
 - explore validator library npm
 - (imp)never in your trust req body


 CHAPTER 22: ENCRYPTING PASSWORD
 - validate data in signup api  
 - install bcrypt package lib
 - create password using bcrypt.hash & save the user as encrypted password into the db

 - create login api
 - compare password and throw error if email or password is invalid


 CHAPTER 23: AUTHENTICATION JWT COOKIES
 - install cookie-parser 
 - just send a dummy cookie to user
 - create GET /profile API and check if you get the cookie back
 - install jsonwebtoken
 - in login API, after email and password, create a JWT token and send it to the user in cookie wrap
 - read the cookie inside your profile API and find the logged in user

 - userAuth middleware
 - add the userAuth middleware in profile API and a new sendConnectionRequest API
 - set the expiry of JWT token and cookies to 5min or something