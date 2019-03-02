var express = require('express');
var session = require('express-session')

module.exports= (app) => {

app.set('views', 'ejs');
app.set('views', './view');
app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat'}));
};
