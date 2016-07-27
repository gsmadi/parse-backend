var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var config = require('./config');

// Set up parse server
var parseServer = new ParseServer({
  databaseURI: config.databaseURI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + config.cloud,
  appId: process.env.APP_ID || config.appId,
  masterKey: process.env.MASTER_KEY || config.masterKey,
  fileKey: config.fileKey,
  serverURL: process.env.SERVER_URL || config.serverURL
});

// Set up parse dashboard
var dashboard = new ParseDashboard({
  "apps": [{
      "serverURL": config.serverURL,
      "appId": config.appId,
      "masterKey": config.masterKey,
      "appName": config.appName,
      "production": config.production,
  }],
  "users": config.users
});

var app = express();
var dashApp = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));


/****************** Parse Server *********************/

// Exporse parse server at /parse
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, parseServer);

app.get('/', function(req, res) {
  res.status(200).send('Parse Server App');
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server running on port ' + port + '.');
});


/****************** Parse Dashboard *********************/

// Expose Parse Dashboard at /dashboard
dashApp.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
dashApp.get('/', function(req, res) {
  res.status(200).send('Parse Dashboard');
});

var httpDash = require('http').createServer(dashApp);
httpDash.listen(4040, function() {
    console.log('dashboard-server running on port 4040.');
});
