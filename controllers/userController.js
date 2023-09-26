
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.home = (req,res) => {

    if(req.isAuthenticated()){
        const user = req.user;
        if(user.role === 'Admin'){
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }

    return res.render('signIn',{
        title: "Sign In"
    })
}


module.exports.signUp = (req,res) => {

    if(req.isAuthenticated()){
        const user = req.user;
        if(user.role === 'Admin'){
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }

    return res.render('signUp',{
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

        return res.status(201).redirect('/');
    } catch (error) {
        console.log(error);
    }
}

module.exports.createSession = (req,res) => {
    const user = req.user;
    if(user.role === 'Admin'){
        return res.redirect('/dashboard/admin');
    }
    return res.redirect('/dashboard/employee');
}

module.exports.signout = async (req,res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err) 
        }
        res.redirect('/');
    });
}