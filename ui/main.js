console.log('Loaded!');

//counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick=function()
{
  //Create a request the counter endpoint
  //var request = new XMLHttpRequest();
  
  //Capture the response and store in variable
  //request.onreadystatechange = function()
 // {
   //   if (request.readystate === XMLHttpRequest.DONE){
          //take action
     //     if(request.status === 200){
            //  var counter = request.responseText;
             counter = counter + 1;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
   //       }
    //  }
      //not done yet
  };
 //Make Request
 //request.open('GET','http://shreeranjanisk.imad.hasura-app.io/counter',true);
 //request.send(null);