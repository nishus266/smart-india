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
    if(response.data.zone == 'Not Secure' && response.data.action == 'Turn Slightly Right and horn system'){
          p.innerHTML= response.data.action;
     }
     if(response.data.zone == 'Not Secure' && response.data.action == 'Turn Slightly Left and horn system'){
           p.innerHTML= response.data.action;
           var hider = document.getElementById('hider');
           hider.style.marginLeft= "-360px";
           hider.style.marginTop= "40px";
           hider.style.height= "200px";
           p.innerHTML= response.data.action;
      }

 }).catch(function (error) {
 console.log(error);
 });
 },1000);
