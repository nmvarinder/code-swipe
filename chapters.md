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

