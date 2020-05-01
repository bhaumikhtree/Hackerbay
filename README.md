# Hackerbay
A test for HackerBay

### Setup and Run Project

    1. git clone https://github.com/bhaumikhtree/Hackerbay.git
    2. open terminal and cd into project repo
    3. run command:
       docker build -t username/tagname .
       docker run -it -p 3000:3000 --rm username/tagname

### Testing of Api can be done  with POSTMAN
    
#### Authentication
     1. set request type POST and type url http://localhost:3000/login
     2. go to body tab select x-www-form-urlencoded
     3. insert key username and value any username & insert key password and value any password
     4. click send.
     you will get result like this:
     
     {
      "auth": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh0cmVlIiwiaWF0IjoxNTg4MjU0MTQ3LCJleHAiOjE1ODgzNDA1NDd9.MFxQoSvqgTadcvYkDi89s9kU7pc4O98IUp5-e0VHgfY",
      "username": "htree"
     }

#### Thumbnail
     1. set request type POST and type url http://localhost:3000/service/thumbnail
     2. go to body tab select x-www-form-urlencoded
     3. insert key image and value any imageurl
     4. go to header tab and add key x-access-token and value to token received from authentication api response 
     5. click send.
     you will get result like this:
     
     {
      "success": true,
      "thumbnail": "./images/resized/photo-1564874757179-b0358f74df91.jpeg"
     }

#### JsonPatch
     1. set request type PATCH and type url http://localhost:3000/jsonpatch
     2. go to body tab select x-www-form-urlencoded
     3. insert key jsonobject and set value to object on which you want to perform patch operation
     4. insert key jsonpatchobject and set value to object used to perform patch operation on jsonobject
     5. go to header tab and add key x-access-token and value to token received from authentication api response 
     6. click send.
     for example on setting 
     jsonobject value { "firstName" : "Albert", "contactDetails": { "phoneNumbers": [] } } 
     jsonpatchobject value  [{ "op": "replace", "path": "/firstName", "value": "Joachim" },{ "op": "add", "path": "/lastName", "value": "Wester" },{"op":"add","path":"/contactDetails/phoneNumbers/0","value":{"number": "555-123"}}] 
     
     you will get result like this:
     
    {
    "document": {
        "firstName": "Joachim",
        "contactDetails": {
            "phoneNumbers": [
                {
                    "number": "555-123"
                }
             ]
         },
        "lastName": "Wester"
      }
    }


###  For Unit testing
     Test cases are written with Mocha and Chai
     Instabul is also added for code coverage analysis

     1.open terminal and cd to root of project
     2.run command
        docker run -it -p 3000:3000 --rm username/tagname npm test



## Logger
   
    For logging Morgan is used and all logs are wriiten in access.log file and also can see in terminal too

## DockerFile 
    docker pull bhaumikhtree/hackerbay


