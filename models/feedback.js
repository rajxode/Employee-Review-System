
// import mongoose 
const mongoose = require('mongoose');

// creating user schema
const feedbackSchema = new mongoose.Schema(
    {
        comment:{
            type:String,
        },
        reviewer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        recipient:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps:true,
    }
)

// creating a new model from schema
const Feedback = mongoose.model('Feedback',feedbackSchema);

// export schema
module.exports = Feedback;
