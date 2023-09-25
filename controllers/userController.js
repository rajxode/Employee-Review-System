
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        let { name, email, password, cnf_password, role } = req.body;
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
            role,
            password:cryptPassword,
        })

        console.log('user created');
        return res.status(201).json({
            user
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.createSession = (req,res) => {
    const user = req.user;
    res.status(200).json({
        user
    })
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