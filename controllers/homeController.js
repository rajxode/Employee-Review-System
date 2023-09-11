
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

module.exports.createSession = (req,res) => {
    const { email, password } = req.body;
    const user = User.find((user) => user.email === email);

    if(user){
        if(user.password !== password){
            console.log('password does not match');
            return res.redirect('back');
        }
        console.log('User logged in');
        return res.redirect('/');
    }

    console.log('user does not exist');
    res.redirect('/sign-up');
}