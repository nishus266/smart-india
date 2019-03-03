var express= require('express');
var app =  express();
var routes =  require('./routes/routes');
var middleware = require('./middleware/middleware');

var rest = require("arest")(app);
rest.addDevice('http','192.168.43.158');

middleware(app);
routes(app);

app.listen(8080);
