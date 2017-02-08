console.log('Loaded!');

//counter code
var button = document.getElementById('counter');

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
};

//Submit Name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit-btn');
submit.onclick=function(){
    //Make a request to the server and send the name
    //Capture list of names and render as list
var names= ['name1','name2','name3','name4'];
var list = '';
for (var i=0;i<names.length;i++){
    list = '<li>'+names[i]+'</li>';
}
 var ul = document.getElementById('namelist');
 ul.innerHTML = list;
};
