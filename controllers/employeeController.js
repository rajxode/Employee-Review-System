
const User = require('../models/User');


module.exports.employee = (req,res) => {
    res.render('employee',{
        title:"Employee | Dashboard"
    });
}