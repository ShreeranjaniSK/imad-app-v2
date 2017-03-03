console.log('Loaded!');

//counter code
/*var button = document.getElementById('counter');

button.onclick=function()
{
  //Create a request the counter endpoint
  var request = new XMLHttpRequest();
  
  //Capture the response and store in variable
  request.onreadystatechange = function()
  {
    if (request.readyState === XMLHttpRequest.DONE){
          //take action
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      //not done yet
  };
 //Make Request
 request.open('GET','http://shreeranjanisk.imad.hasura-app.io/counter',true);
 request.send(null);
};*/

//Submit Username and Password

var submit = document.getElementById('submit-btn');
submit.onclick=function(){
    //Make a request to the server and send the name
   
    var request = new XMLHttpRequest();
  
  //Capture list of names and render as list
  request.onreadystatechange = function()
  {
    if (request.readyState === XMLHttpRequest.DONE){
          //take action
          if(request.status === 200){
              console.log('User loggedin');
              alert('Logged in successfully');
            }else if(request.status === 403){
                alert('Username/Password incorrect');
            }else if(request.status === 500){
                alert('Something went wrong on the server');
            }
          }
      };
      
      /*  var names= request.responseText;
            names=JSON.parse(names);
            var list = '';
            for (var i=0;i<names.length;i++){
                list += '<li>'+names[i]+'</li>';
            }
             var ul = document.getElementById('namelist');
             ul.innerHTML = list;*/

      //not done yet
 
 //Make Request
    //var nameInput = document.getElementById('name');
    //var name = nameInput.value;
    //request.open('GET','http://shreeranjanisk.imad.hasura-app.io/submit-name?name='+name,true);
    //request.send(null);
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://shreeranjanisk.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','/application/json');
    request.send(JSON.stringify({username:username , password:password}));
};
