
require('dotenv').config();
require('./config/mongoose').connect();
const express = require('express');

const {PORT} = process.env;

const app = express();

const cookieParser = require('cookie-parser')
const session=require('express-session');
// importing layouts 
const expressLayouts =  require('express-ejs-layouts');

// flash messages package and middleware
const flash = require('connect-flash');
const myMware=require('./config/middleware');

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

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));



// connect-flash middleware
app.use(flash());
app.use(myMware.setFlash);

app.use('/',require('./routes'));

app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`));