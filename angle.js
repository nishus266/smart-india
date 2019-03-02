var session = require('express-session');


module.exports= (request , response) => {
var distance = 63;
var threshold_angle_1 = 89.5;
var threshold_angle_2 = 90.4;
var threshold_distance = 90;
var threshold_classification_distance = 2.5;
var velocity= 22.00 ; //velocity of user car in m/s
var angle = 89.7;

var data={
  distance: 70,
  prev_distance: 66,
  prev_p_distance: 64,
  prev_pp_distance: 62,
  angle: 89.7,
  angle_prev: 89.7,
  angle_p_prev: 89.6,
  angle_pp_prev: 89.6
};
request.session.data = data;
data1=request.session.data;
console.log(request.session.data);

var res_data = {
   zone: 'Secure',
   action: 'Have a Beautiful Journey',
   velocity: velocity,
};

if( angle > threshold_angle_1 && angle < threshold_angle_2){
    if( distance + threshold_classification_distance < data1.prev_distance){
      if(distance < threshold_distance){
        res_data.zone = "Danger";
        res_data.action =  "break system active and horn system";
      }else{
        res_data.zone =  "Not Secure";
        res_data.action =  "Alert system";
      }
    }

}else{
  if(angle >= angle_prev - 0.01 && angle <= angle_prev + 0.01 &&  distance < prev_distance){
    res_data.zone =  "Not Secure";
    res_data.action =  "Alert system";
  }
}

var data={
  distance: distance,
  prev_distance: data.distance,
  prev_p_distance: data.prev_distance,
  prev_pp_distance: data.prev_p_distance,
  angle: angle,
  angle_prev: data.angle,
  angle_p_prev: data.angle_prev,
  angle_pp_prev: data.angle_p_prev

};
request.session.data = data;
console.log(request.session.data);
response.send(res_data);
}
