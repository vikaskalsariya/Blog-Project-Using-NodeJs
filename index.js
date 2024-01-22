const express = require('express');

const port = 8050;

const path = require("path");

const Admin = require('./model/admin.js');

const db = require('./config/db.js');

const app = express();

const cookieParser = require('cookie-parser');

var session = require('express-session');

const passport = require('passport');

const LocalStrategie = require('./config/passport-local-strategie.js');

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name : 'AdminData',
    secret: 'AdminData',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge : 1000*60*100,
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use('/',require('./routes/user.js'));
app.use('/admin',require('./routes/admin.js'));

app.listen(port,(err)=>{
    if(err)
        console.log("Error listening with port : " + port);
    
        console.log("App listening with port : " + port);
});
