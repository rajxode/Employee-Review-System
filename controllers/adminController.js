
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

module.exports.updateForm =  async(req,res) => {

    const employee = await User.findById(req.query.id);

    res.render('updateForm',{
        title:"Admin | Update Employee ",
        employee:employee
    });
}

module.exports.updateEmployee = async(req,res) => {
    await User.findByIdAndUpdate(req.query.id, req.body);

    res.redirect('/dashboard/admin');
}


module.exports.addEmployeeForm =  (req,res) => {
    res.render('addEmployee',{
        title:"Admin | Add Employee ",
    });
}

module.exports.addEmployee = async(req,res,next) => {
    try {
        const {name,email,password,cnf_password} = req.body;
        const role = 'Employee';

        const userExist = await User.findOne({email});

        if(!userExist){

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
        }

        return res.redirect('/dashboard/admin');


    } catch (error) {
        console.log(error);
    }
}


module.exports.assignReview = async(req,res) => {
    const employee = await User.findById(req.query.id);

    if(!employee){
        return res.redirect('back');
    }

    if(employee.reviewAssigned.includes(req.body.recipient)){
        return res.redirect('back');
    }

    employee.reviewAssigned.push(req.body.recipient);

    await employee.save();

    res.redirect('back');
}