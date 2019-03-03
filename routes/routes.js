var data_in = require('../data_in');
var angle = require('../angle');
var gui = require('../gui');

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

  app.get('/gui_api', (request , response) =>{
       gui(request , response);
  });
  app.get('/gui', (request , response) =>{
       response.render('gui.ejs', {});
  });
  app.get('/gui_data', (request , response) =>{
       response.render('gui_data.ejs', {});
  });
};
