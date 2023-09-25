
require('dotenv').config();
require('./config/mongoose').connect();
const express = require('express');
const passportConfig = require('./config/passport_local');
const passport = require('passport');

const {PORT} = process.env;

const app = express();

const cookieParser = require('cookie-parser')
const session=require('express-session');
// importing layouts 
const expressLayouts =  require('express-ejs-layouts');

// flash messages package and middleware
const flash = require('connect-flash');
const myMware=require('./config/middleware');

const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({
    extended:true
})); 
app.use(express.static('assets'));

app.use(cookieParser());

// using layouts

app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting view engine as ejs and defining its path
app.set('view engine','ejs');
app.set('views','./views');

// Use express-session for session management
app.use(session({
    secret: process.env.SECRET_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (1 day in this example)
      secure: false, // Set this to false to allow the session over HTTP
    },
    store: MongoStore.create({
      mongoUrl:process.env.MONGODB_URL
    })
  }));
  
// initialize passport
app.use(passport.initialize());
// passport sessions
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// connect-flash middleware
app.use(flash());
app.use(myMware.setFlash);

app.use('/',require('./routes'));

app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`));