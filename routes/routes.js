var data_in = require('../data_in');
var new_data_out = require('../new_data_out');

module.exports= (app) =>{

  app.get('/', (request , response) =>{
    response.render('index.ejs',{message: "server build succesfully"});

  });

  app.get('/data_in', (request ,  response) =>{
       data_in(request , response);
  });

  app.get('/dataout', (request , response) =>{
       new_data_out(request , response);
  });

};
