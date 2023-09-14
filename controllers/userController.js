
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.home = (req,res) => {
    res.render('signIn',{
        title: "Sign In"
    })
}


module.exports.signUp = (req,res) => {
    res.render('signUp',{
        title: "Sign Up"
    })
}

module.exports.createAccount = async (req,res) => {
    try {
        let { name, email, password, cnf_password } = req.body;
        email = email.toLowerCase();
        const userExist = await User.findOne({email});

        if(userExist){
            console.log('User already exist');
            return res.redirect('/');
        }

        if(password !== cnf_password ){
            console.log('password does not match');
            return res.redirect('back');
        }

        const cryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password:cryptPassword,
        })

        console.log('user created');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
    }
}

module.exports.createSession = async (req,res) => {

    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        // find user by it's email
        const user = await User.findOne({email});

        // if user found 
        if( user){
            // match the password
            const found = await bcrypt.compare(password, user.password); 

            // if password matches
            if(found){
                // generate token
                const token = jwt.sign(
                    {user_id: user._id, email},
                    process.env.SECRET_KEY,
                    {
                        expiresIn:"2h"        
                    }
                )
                    
                // store the token
                user.token = token;
                // hide the password
                user.password = undefined;
                
                // store the token inside the cookies
                // options for cookies
                const options = {
                    // time in which the cookie will expire
                    expires: new Date(
                        // current day + 3 days ( 3 * 24 hour * 60 min * 60 second * 1000 )
                        Date.now() + 3 * 24 * 60 * 60 * 1000
                    ),
                    // for backend only
                    httpOnly: true,
                };

                // store inside the cookie
                // return json value { cookie, token , user data}
                req.flash('success', 'Logged In successfully');
                res.status(200).cookie("token", token, options).redirect('/dashboard/admin');
            }
        }


        // in case user not found or the password doesn't matches
        req.flash('error','wrong data');
        return res.redirect('back');        
    } catch (error) {
        
    }

}

module.exports.signout = async (req,res) => {
    // getting token from cookie / body
    const token = req.cookies.token ||
        req.body.token; 

    // if token found
    if(token){
        // remove user's data
        req.user = null;
        return res.status(200).clearCookie("token").redirect('/');
    }

    // checking if token is stored inside header
    let header = req.header("Authorization");
    if(header){
        req.user = null;
        // delete token from header
        delete req.header["Authorization"];
        req.flash('success','Logged out successfully')
        return res.status(200).redirect('/');
    }

    return res.redirect('back');
}