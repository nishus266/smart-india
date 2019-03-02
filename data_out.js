var session = require('express-session');


module.exports= (request , response) => {
   var list_center_lrr = [ 200, 250 , 200 , 5];
   var list_left_srr = [ 50 , 30];
   var list_right_srr = [ 50 , 30];
   var velocity= 22.00 ; //velocity of user car in m/s
   var relative_velocity = 2 ; //relative velocity
   var velocity_another_object = 0 ;
   var center_lrr = Math.min.apply( Math, list_center_lrr );  //real time data in m
   var left_srr = Math.min.apply( Math, list_left_srr );   //real time data in m
   var right_srr = Math.min.apply( Math, list_right_srr );  //real time data in m

     if(relative_velocity < velocity){
       velocity_another_object = velocity + relative_velocity;
     }else{
       velocity_another_object = relative_velocity - velocity;
     }
     
   //if(!request.session.data){
   var data={
     center_lrr: 10,
     left_srr: 30,
     right_srr: 80
   };
   request.session.data = data;
   console.log(request.session.data);
   //}
   var center_lrr_prev = request.session.data.center_lrr; //data before 1s in m
   var left_srr_prev = request.session.data.left_srr;  //data before 1s in m
   var right_srr_prev = request.session.data.right_srr; //data before 1s in m
   var threshold_distance = 100;  //threshold distance use for data analysis
   var threshold_classification_distance = 5;
   var threshold_classification_distance_left = 2;
   var threshold_value_alert = 50;
   var threshold_value_alert_left = 10;
   var res_data = {
      zone: 'Secure',
      action: 'Have a Beautiful Journey',
      velocity: velocity
   }; //object use to send data to client side for graphical User Interface

   //to done threshold value analysis on the basis of  our speed
   if(velocity > 19.44 ){
        threshold_distance = 200; //if speed is greator then 70 km/hour then we have to do analysis on large threshold of distance
        threshold_classification_distance = 10;
        threshold_classification_distance_left = 5;
        threshold_value_alert = 150;
        threshold_value_alert_left = 10;
   }

   if( center_lrr + threshold_classification_distance < center_lrr_prev ){
      if(center_lrr < threshold_distance){
            if(center_lrr < threshold_value_alert){
              res_data.zone = "Danger";
              res_data.action =  "break system active and horn system";
            }else{
              res_data.zone =  "Not Secure";
              res_data.action =  "Alert system";
            }
      }
   }else{

          if(left_srr + threshold_classification_distance_left < left_srr_prev){

             if(left_srr < threshold_value_alert_left){

             res_data.zone = "Not Secure";
             res_data.action = "Turn Slightly Right and horn system";
             }
          }else{

              res_data.zone= "Secure";
              res_data.action = "Have a Beautiful Journey";
          }

          if(right_srr+ threshold_classification_distance_left < right_srr_prev){
             if(right_srr < threshold_value_alert_left){
             res_data.zone = "Not Secure";
             res_data.action = "Turn Slightly Left and horn system";
             }
          }else{

              res_data.zone= "Secure";
              res_data.action = "Have a Beautiful Journey";
          }

   }
   var data={
     center_lrr: center_lrr,
     left_srr: left_srr,
     right_srr: right_srr
   }
   request.session.data = data;
   console.log(request.session.data);
   response.send(res_data);
};
