console.log('Loaded!');

//change the data in the main text div

var element = document.getElementById('main-text');
element.innerHTML = 'New Value Entered';
//Move the image
var img= document.getElementByID('madi');
img.onclick = function(){
    img.style.marginLeft = '100px';
};