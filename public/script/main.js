//window.alert('working');
setInterval( function(){

axios.get('/dataout').then( function(response) {
   var p = document.getElementById('demo');
   var m = document.getElementById('zone');
   console.log(response);
   m.innerHTML= response.data.zone;
   var speed= document.getElementById('speed');
   speed.innerHTML = (response.data.velocity * 36)/10;

  if(response.data.zone == 'Secure'){
        p.innerHTML= response.data.action;
       var car = document.getElementById('car');
       car.style.animation="none";
       car.style.color="green";
       var hider = document.getElementById('hider');
       hider.style.display="none";
   }
   if(response.data.zone == 'Danger'){
         p.innerHTML= response.data.action;
        var car = document.getElementById('car');
        car.style.color="red";
        var hider = document.getElementById('hider');
        hider.style.display="none";
    }

 }).catch(function (error) {
 console.log(error);
 });
},250);
