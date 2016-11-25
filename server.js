var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config = {
    user:'depressed-iceberg',
    database:'depressed-iceberg',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

/*var article={
    'article-one':{
        title:'This is It',
        heading:'ARTICLE ONE',
        date:'oct 5,2016',
        content:` <p>
                    Hey Guys This Is JAi RAm Desik Saying a warm welcome to you fellas
        
                </p>`
    },
    'article-two':{
        title:'This is It 2',
        heading:'ARTICLE TWO',
        date:'oct 5,2016',
        content:` <p>
                    Yo check it out this is my second article                              
        
                </p>`
        
    },
    'article-three':{
        title:'This is It 3',
        heading:'ARTICLE THREE',
        date:'oct 30,2016',
        content:` <p>
                    NARAYANAM JAI RAM DESIK
                    TI SI YM EMAN 
        
                </p>`
    }
};*/

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class = "container">
         <div>
             <a href="/">Home</a>
             <span style="display:inline-block; width: 100;"></span>
             <a href="/article/article-one">ARTICLE ONE</a>
             <span style="display:inline-block; width: 100;"></span>
             <a href="/article/article-two">ARTICLE TWO</a>
             <span style="display:inline-block; width: 100;"></span>
             <a href="/article/article-three">ARTICLE THREE</a>
         </div>
         <h3>
            ${heading}
         </h3>
         <div>
            ${date.toDateString()}
         </div>
         <div>
            <p>
                ${content}  
            </p>
         </div>
        </div>
    </body>
    </html>
 `;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'a/b', 'index.html'));
});

function hash(input,salt){
    //How do we create hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-one-random-String');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    //username,password
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('User successfully created:' + username);
        }        
    });
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE USERNAME = $1', [username], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.send(403).send('username/passwerd is invalid');
            }else{
                //Match the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                if(hashedPassword === dbString){
                    res.send('Credentials correct');
                }else{
                    res.send(403).send('Username/password is invalid');
                }
            }
        }        
    });
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

var counter = 0;
app.get('/counter',function(req,res){
    counter++;
    res.send(counter.toString());
});

app.get('/favicon.ico', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

var names = [];
app.get('/submit-name',function(req,res){
    //Get the namefrom the request
    var name = req.query.name;
    names.push(name);
    //JSON:Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/article/:articleName',function (req,res){
  pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName],function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length === 0){
              res.status(404).send('Article not found');
          }else{
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
          }
      }
  });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});