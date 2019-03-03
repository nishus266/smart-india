var session = require('express-session');

module.exports = (request , response) =>{

  var Curl = require( 'node-libcurl' ).Curl;
  var curl = new Curl();
  curl.setOpt( Curl.option.URL, 'localhost:8080/sensor_module/distance' );
  curl.setOpt( 'FOLLOWLOCATION', true );
  curl.on( 'end', function( statusCode, body, headers ) {
      //console.info( statusCode );
      //console.info( '---' );
      var m=JSON.parse(body);
      var angle = 70 ;
      var x_axis=  m.distance * Math.cos(angle * Math.PI / 180);
      var y_axis=  m.distance * Math.sin(angle * Math.PI / 180);

      if(!request.session.data){

        var data = {
          speed: 10,
          angle: 70,
          distance: m.distance,
          x_axis: x_axis,
          y_axis: y_axis,
          prev_x_axis: 250,
          prev_y_axis: 250
        };
      }else{
        var data = {
          speed: 10,
          angle: 70,
          distance: m.distance,
          x_axis: x_axis,
          y_axis: y_axis,
          prev_x_axis: request.session.data.x_axis,
          prev_y_axis: request.session.data.y_axis
        };
      }
      request.session.data = data;

       response.send(data);
  });
  curl.on( 'error', function( err, curlErrorCode ) {
      console.error( err.message );
      console.error( '---' );
      console.error( curlErrorCode );
      this.close();
  });
  curl.perform();





};
