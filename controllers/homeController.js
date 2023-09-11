
const User = [];

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

module.exports.createAccount = (req,res) => {
    const { name, email, password, cnf_password } = req.body;
    const user = {
        name,
        email,
        password
    }
    User.push(user);
    console.log('user created');
    return res.redirect('/');
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