var session = require('express-session');


module.exports= (request , response) => {
   var distance= [ 140.00, 139.96, 138.99 , 138.00];
   var angle = [89.67, 89.67, 89.68, 89.67];
   var temp = [];
   for(i=0 ;i<4 ; i++){
       temp.push(parseInt(distance[i]));
   }
   var modeMap = {};
    var maxEl = temp[0], maxCount = 1;
    for(var i = 0; i < temp.length; i++)
    {
        var el = temp[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }

    }
    var item= maxEl;
   var filter_distance = [];
   var angle_filter = [];
   for(i=0 ;i<4 ; i++){
       if( distance[i] < item+3 && distance[i] > item -3 ){
          filter_distance.push(distance[i]);
          angle_filter.push(angle[i]);
       }
   }
   var center_lrr = filter_distance.reduce((a,b) => a + b, 0) / filter_distance.length;
   var angle = angle_filter.reduce((a,b) => a + b, 0) / angle_filter.length;
   var velocity= 22.00 ; //velocity of user car in m/s
   var relative_velocity = 2 ; //relative velocity
   var velocity_another_object = 0 ;

     if(relative_velocity < velocity){
       velocity_another_object = velocity + relative_velocity;
     }else{
       velocity_another_object = relative_velocity - velocity;
     }

   //if(!request.session.data){
   var data={
     center_lrr: 170
   };
   request.session.data = data;
   console.log(request.session.data);
   //}
   var center_lrr_prev = request.session.data.center_lrr; //data before 1s in m
   var threshold_distance = 100;  //threshold distance use for data analysis
   var threshold_classification_distance = 5;
   var threshold_value_alert = 50;
  
   var res_data = {
      zone: 'Secure',
      action: 'Have a Beautiful Journey',
      velocity: velocity,
   }; //object use to send data to client side for graphical User Interface

   //to done threshold value analysis on the basis of  our speed
   if(velocity > 19.44 ){
        threshold_distance = 200; //if speed is greator then 70 km/hour then we have to do analysis on large threshold of distance
        threshold_classification_distance = 10;
        threshold_value_alert = 150;

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


   }
   var data={
     center_lrr: center_lrr

   }
   request.session.data = data;
   console.log(request.session.data);
   response.send(res_data);
};
