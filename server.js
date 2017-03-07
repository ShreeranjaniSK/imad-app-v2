var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');

var config ={
  user: 'shreeranjanisk',
  database: 'shreeranjanisk',
  host : 'db.imad.hasura-app.io',
  port: '5432',
  password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
//JSON content goes into req.body using bodyParser in express framework
app.use(bodyParser.json());


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
                ${date.toDateString()}
            </div>
            <div>
               ${content}
            </div>
        </div>
    </body>
</html>`;
return htmlTemplate;
}

var pool = new Pool(config);

function hash(input,salt){
    
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
   return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
   //How do we create a hashtag
   var hashedString = hash(req.params.input,'this-is-a random-data');
   res.send(hashedString);
   
});

app.post('/create-user',function(req,res){
    //username and password
    //JSON content gives username and password
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt); 
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
      
      if (err){
           res.status(500).send(err.toString());
       } else{
           res.send('User Successfully Created');
           
       }  
       
   });
});

app.post('/login',function(req,res){
   
    var username = req.body.username;
    var password = req.body.password;
    
    var dbString = hash(password,salt); 
    pool.query('SELECT * FROM "user" WHERE username = $1)',username,function(err,result){
      
      if (err){
           res.status(500).send(err.toString());
       } else{
           if (result.rows.length === 0){
               res.send(403).send('Invalid Username/Password ');
           }
           else{
            //Match the password
            var dbString = result.rows[0].password;
            var salt = dbstring.split('$')[2];
            var hashedPassword = hash(password,salt); //creating hashedPassword based on the password submitted and original salt value;
            if(hashedPassword === dbString)
            {
            res.send('Credentials are Correct');
            }
            else{
                res.send(403).send('Invalid Username/Password ');
            }
           }
       }  
       
   }); 
});
app.get('/test-db',function(req,res){
  //make a select request
    pool.query('SELECT * FROM test',function(err,result){
       if (err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result.rows));
           
       }
    });
  //return a response
  
}
);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){//url: /submit-name/?name=xxxx
//Get name from  the request
var name = req.query.name;
names.push(name);
//JSON Javascript Object Notation
res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    //articleName == article-One
    //articles[articleName] == {} content object for articleOne
    //var articleName = req.params.articleName;
     pool.query("SELECT * FROM article where title = $1",[req.params.articleName],function(err,result){
       if (err){
           res.status(500).send(err.toString());
       } else{
           if (result.rows.length === 0){
               res.status(404).send('No Data Found');
           }
           else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
           }
           //res.send(JSON.stringify(result.rows));
           }
       });
    
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
