const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port= process.env.PORT ||300;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req2,res2,next)=>{
  var now =new Date().toString();
  var log=now+' :'+req2.method+''+req2.url+'\n';
  fs.appendFile('myLogFile.txt',log,(err)=>{
    if(err)
    {
      console.log('Unable to write log');
    }
  });
  next();
});

//app.use((req2,res2,next)=>{
//      res2.render('maintainance.hbs');
//});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000',port);
});
