
// import jwt for token verification
const jwt = require('jsonwebtoken');

// create middleware
const auth = (req,res,next) => {

    // getting token form header / body / cookies
    // header contains "Bearer", so removing it from token string
    let token = req.cookies.token ||
                req.body.token; 
    
    let header = req.header("Authorization");
    if(header){
        token = header.replace("Bearer ","");
    }
    
    // if token doesn't exist 
    if(!token){
        return res.status(403).redirect('/');
    }

    // if token found then 
    try {
        // decond the token using jwt and secret key used for generating the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        // save the decoded value { contains user._id , email , iat , expiresIn}
        req.user = decode;
    } catch (error) {
        // if there is any error in decoding the token
        return res.status(401).redirect('/');
    }
    
    // calling next step
    return next();
}


// export to use inside the route
module.exports = auth;