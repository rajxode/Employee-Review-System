
module.exports.home = (req,res) => {
    res.render('home',{
        title: "Sign In"
    })
}


module.exports.signUp = (req,res) => {
    res.render('signUp',{
        title: "Sign Up"
    })
}