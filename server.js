var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
  host: 'http://db.imad.hasura-app.io/',
  user: 'depressed-iceberg',
  password: process.env.DB_PASSWORD,
  port:'5432',
  database: 'depressed-iceberg'
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParse.json());
function createTemplate(data){}
    var title = data.title;
    var date=date.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate=
    <html>
     <head>
     <title>
     ${title}
     </title>
     <meta name ="viewport" content ="width=device-width,initial-scale=1"/>
     <link href ="/ui/style.css"rel="stylesheet"/>
     </head>
     <body>
         <div class="container">
         <div>
           <a href="/">Home</a>
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input , salt, 100000, 512, 'sha512');
    return ["pbkdf","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    //username,password
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2) ',[username, dbString],  function(err,result){
       if(err){
       res.status(500).send(err,toString());
       }
       else{
       res.send('User successfully created:'+ username);
       }
    });
    
});

var pool = new Pool(config);
app.get('/test-db',function(req,res) {
 //make a select request 
  pool.query('SELECT*FROM test',function(err,result){
   if(err){
       res.status(500).send(err,toString());
   }
   else{
       res.send(JSON.stringify(result));
   }
  });
});

app.get('/article-one',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two',function(req,res){
    res.send('Article one requ');
});
app.get('/article-three',function(req,res){
    res.send('Article one requ');
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

