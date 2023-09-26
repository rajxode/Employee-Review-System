
const User = require('../models/User');

const Feedback = require('../models/Feedback');

module.exports.employee = async (req,res) => {

    let employeeAssignedForReview = [];
    const idOfAssignReview = req.user.reviewAssigned;

    if(req.user.reviewAssigned.length > 0 ){

        for (let index = 0; index < idOfAssignReview.length; index++) {
            
            let employee = await User.findById(idOfAssignReview[index]);

            if(employee){
                employeeAssignedForReview.push(employee);
            }
            
        }
    }

    res.render('employee',{
        title:"Employee | Dashboard",
        assignedEmployee:employeeAssignedForReview
    });
}


module.exports.addReview = async(req,res) => {
    try {
        const recipient = req.query.id;
        const reviewer = req.user._id;
        const {comment} = req.body;

        const feedbackId = await Feedback.create({
            comment,
            reviewer,
            recipient
        });

        const recipientEmployee = await User.findById(recipient);
        recipientEmployee.feedbackByOthers.push(feedbackId);

        await recipientEmployee.save();

        const reviewerEmployee = await User.findById(reviewer);

        const assignedReviews = reviewerEmployee.reviewAssigned;

        console.log('id',recipient);
        assignedReviews.map((rev) => console.log('old',rev.id));


        const newAssignedReview = assignedReviews.filter((review) => review.id !== recipient);

        console.log('new',newAssignedReview);

        reviewerEmployee.reviewAssigned = newAssignedReview;

        await reviewerEmployee.save();

        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}