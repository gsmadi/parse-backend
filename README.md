# parse-backend
Serve both ParseServer and ParseDashboard from a single script

##Install
+ `git clone https://github.com/gsmadi/parse-backend.git`
+ `npm install`

##Run
+ `Modify config.js` Populate the appropriate keys and configuration variables. User field is arbitrary. 
+ `npm start` Run parse-backend. By default, parse-server is exposed at port 1337 and the dashboard at port 4040.

## Test
+ Check Parse Dashboard at [localhost:4040/dashboard](http://localhost:4040/dashboard). If all is well a login should appear and afterwards the user should be able to view Parse Server data.