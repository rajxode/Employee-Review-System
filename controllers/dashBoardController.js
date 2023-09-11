

module.exports.admin = (req,res) => {
    res.render('admin',{
        title:"Admin | Dashboard "
    });
}

module.exports.employee = (req,res) => {
    res.render('employee',{
        title:"Employee | Dashboard"
    });
}