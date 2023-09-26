
const User = require('../models/User');

module.exports.admin = async (req,res) => {
    
    try {
        const employeeList = await User.find({role:'Employee'});
        
        res.render('admin',{
            title:"Admin | Dashboard ",
            employee:employeeList
        });
    } catch (error) {
        
    }
}


module.exports.deleteEmployee = async (req,res) => {
    try {
        const id = req.query.id;

        await User.findByIdAndDelete(id);

        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateForm =  (req,res) => {
    res.render('updateForm',{
        title:"Admin | Update Employee ",
    });
}

module.exports.addEmployeeForm =  (req,res) => {
    res.render('addEmployee',{
        title:"Admin | Add Employee ",
    });
}