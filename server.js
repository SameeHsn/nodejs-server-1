//intro vid express - downloaded/uploaded on Mega.nz account
const express = require('express');
const hbs = require('hbs'); //templating engine
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //express related configs - views = default directory for templates by express

app.use((req, res, next) => { //middleware

  var now = new Date().toString();
  var mylog = `${now}: ${req.method} ${req.url}`;

  console.log(mylog);
  fs.appendFile('server.log', mylog + '\n', (err) => {
    if (err){
      console.log('ERROR....');
    }
  });
  next(); //to finish middleware
});

//when site is in maintenance mode, skip everything and show this
// app.use((req, res, next) => {
//   res.render('mnt.hbs');
//   //next();
// });

//main website
app.use(express.static(__dirname + '/public')); //builtin middleware function

//handlebars helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
//  console.log(text);
 return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello express.</h1>');
  res.render('home.hbs', {
    welcome: 'Welcome to home',
    titlePage: 'HOME PAGE'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titlePage: 'About page'
  });
});


app.get('/bad', (req, res) => {
  res.send({bad: 'Bad request'});

});


app.listen(3000, () => {
  console.log('Server is up on port 3000..');
});
