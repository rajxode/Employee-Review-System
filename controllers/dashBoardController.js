
const User = require('../models/User');

module.exports.admin = async (req,res) => {
    
    try {
        const employeeList = await User.find({});
        
        res.render('admin',{
            title:"Admin | Dashboard ",
            employee:employeeList
        });
    } catch (error) {
        
    }
}

module.exports.employee = (req,res) => {
    res.render('employee',{
        title:"Employee | Dashboard"
    });
}