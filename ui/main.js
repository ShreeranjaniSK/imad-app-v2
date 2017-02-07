console.log('Loaded!');

//change the data in the main text div

var element = document.getElementById('main-text');
element.innerHTML = 'New Value Entered Image Moves';
//Move the image
var img= document.getElementById('madi');
img.onclick = function(){
//    var interval = setInterval(moveLeft,100);
    img.style.marginLeft = '100px';
};