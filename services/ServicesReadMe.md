# Services

## base.ts :

### tryNonAuthRequest
All the requests to the backend which do not require aunthentication are sent through this channel.

### trynAuthRequest
All the requests to the backend which require aunthentication are sent through this channel.


## auth.ts :

### tryAuth
Authenticates the user.

#### tryRegister
Registers the user.

### trySetup
API calls to respective setup endpoints for location, qualification and skills.

### verifyIfUserExists
API calls to backend to verify if a user exists.

### verifyIfSetup
Checks if the setup process is complete for each user during login.



## request.ts :

### makeInstructorRequest
Creates a shift request that is sent out to the insttructor.

### getInstructorRequest
instructor gets a request through this call.

### acceptInstructorRequest
Instructor's response to the request

### denyInstructorRequest
Instructor's response to the request