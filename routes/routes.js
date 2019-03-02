var data_in = require('../data_in');
var angle = require('../angle');

module.exports= (app) =>{

  app.get('/', (request , response) =>{
    response.render('index.ejs',{message: "server build succesfully"});

  });

  app.get('/data_in', (request ,  response) =>{
       data_in(request , response);
  });

  app.get('/dataout', (request , response) =>{
       angle(request , response);
  });

};
