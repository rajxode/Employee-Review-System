
const User = require('../models/User');

const Feedback = require('../models/Feedback');

module.exports.employee = async (req,res) => {

    let employeeAssignedForReview = [];
    const idOfAssignReview = req.user.reviewAssigned;

    let feedbackByOther = [];
    const idofFeedbacks = req.user.feedbackByOthers;

    if(idOfAssignReview.length > 0 ){

        for (let index = 0; index < idOfAssignReview.length; index++) {
            
            let employee = await User.findById(idOfAssignReview[index]);

            if(employee){
                employeeAssignedForReview.push(employee);
            }
            
        }
    }

    if(idofFeedbacks.length > 0 ){

        for (let index = 0; index < idofFeedbacks.length; index++) {
            
            let feedback = await Feedback.findById(idofFeedbacks[index]).populate('reviewer','name');

            if(feedback){
                feedbackByOther.push(feedback);
            }
            
        }
    }

    res.render('employee',{
        title:"Employee | Dashboard",
        assignReviews:employeeAssignedForReview,
        feedbacks:feedbackByOther
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

        const newAssignedReview = assignedReviews.filter((review) => JSON.stringify(review) !== JSON.stringify(recipient));

        reviewerEmployee.reviewAssigned = newAssignedReview;

        await reviewerEmployee.save();

        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}