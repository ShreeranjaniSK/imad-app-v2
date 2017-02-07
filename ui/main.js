console.log('Loaded!');

//change the data in the main text div

var element = document.getElementById('main-text');
element.innerHTML = 'New Value Entered Image Moves';
//Move the image
var img= document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 2;
    img.style.marginLeft=marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight,50);
//    img.style.marginLeft = '100px';
};