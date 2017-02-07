var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles ={
 'article-one' :{
    title : 'Article-One Shree',
    heading: 'Article-One',
    date: 'Feb 5 2017',
    content : `   <p>
                My first content in my webapp.My first content in my webapp.My first content in my webapp.
                </p>
                <p>       
                My first  content in my webapp.My first content in my webapp.My first content in my webapp.My first content in my webapp.My first content in my webapp.helloooooo
                </p> 
                 <p>       
                My first  content in my webapp.My first content in my webapp.My first content in my webapp.My first content in my webapp.My first content in my webapp.helloooooo
                </p> `
},
 'article-two' : { 
    title :'Article-Two Shree',
    heading:'Article-Two',
    date:'Feb 6 2017',
    content :`  <p>
            My Second content in my webapp.
            </p>`,
 },
 'article-three' : { 
     title :'Article-Three Shree',
    heading:'Article-Three',
    date:'Feb 7 2017',
    content:` <p>
                My third article in my webapp.
            </p>
            <p>       
                Hello Good Morning
            </p> 
             <p>       
                Good Start for a Good Day...
            </p>` 
 }
};
function createTemplate(data){
    var title = data.title;
    var heading=data.heading;
    var date =data.date;
    var content=data.content;
var htmlTemplate = `
<html>
    <HEAD>
        <title>
            ${title}
        </title>
         <link href="/ui/style.css" rel="stylesheet" />
    </HEAD>
    <body>
        <div class="container">
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
               ${content}
            </div>
        </div>
    </body>
</html>`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1
    res.send(counter.toString());
})

app.get('/:articleName',function(req,res){
    //articleName == article-One
    //articles[articleName] == {} content object for articleOne
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
