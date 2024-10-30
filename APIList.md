# list of api

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/name
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:userId 
- POST /request/review/rejected/:userId

## userRouter
- GET /user/connection
- GET /user/ignores 
- GET /user/requests
- GET /user/feed - all the profiles

status: ignore, interested, accepted, reject 

