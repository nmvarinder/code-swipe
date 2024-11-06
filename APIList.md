# list of api

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/editOnce -> combined: firstName, lastName & gender
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
    (status-> interested, ignored)
    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId
    - POST /request/review/accepted/:requestId 
    - POST /request/review/rejected/:requestId

## userRouter
- GET /user/connection
- GET /user/ignores 
- GET /user/requests
- GET /user/feed - all the profiles

status: ignore, interested, accepted, reject 

