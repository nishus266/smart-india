

setInterval( function(){

axios.get('/gui_api').then( function(response) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.fillRect(150, 0, 10, 25);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.beginPath();
  ctx.fillRect( 150 + response.data.x_axis,response.data.y_axis , 10, 25);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.clearRect(150 + response.data.prev_x_axis, response.data.prev_y_axis, 10, 25);
  console.log(response);



 }).catch(function (error) {
 console.log(error);
 });
},1000);
