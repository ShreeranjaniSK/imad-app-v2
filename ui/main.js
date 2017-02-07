console.log('Loaded!');

//counter code
var button = document.getElementById('counter');
button.onclick=function()
{
  //Create a request the counter endpoint
  var request = new XMLHTTPRequest();
  
  //Capture the response and store in variable
  request.onreadystatechange = function()
  {
      if (request.readystate === XMLHTTPRequest.DONE){
          //take action
          if(request.status === 200){
              var counter = request.responseText;
              counter = counter + 1;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      //not done yet
  };
 //Make Request
 request.open('GET','http://http://shreeranjanisk.imad.hasura-app.io/counter');
 request.send(null);
};