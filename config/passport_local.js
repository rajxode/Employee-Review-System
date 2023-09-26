

const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;


const bcrypt = require('bcryptjs');


const User = require('../models/User');


passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
    async (email, password, done) => {
        const user = await User.findOne({ email: email })
        // if found
        if(user){
            const found = await bcrypt.compare(password, user.password);
            if (!found) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }
        // if user not found
        else{
            return done(null, false, { message: 'Incorrect username.' });
        }
    }
));


// storing the user information in the session
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// retrieving user information from the session
passport.deserializeUser(async function(id, done){
    // find user
    const user = await User.findById(id);
    // if no user found
    if (!user) {
        return done(new Error('User not found'));
    }
    // if found 
    done(null, user); // Retrieve the user based on the stored ID
    
})



// check whether the user is authenticated or not
passport.checkAuthentication =  function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then pass the request to the next function / action in controller
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect('/');
}


// sending user data to local for view
passport.setAuthenticatedUser = function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then sending current signed in user's data (req.user) to locals for views (res.local.user)
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}


// exporting passport for outside use
module.exports = passport;