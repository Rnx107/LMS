/*
 Enrollment Model
 */

import mongoose from 'mongoose';
const enrollmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Type.ObjectId,
        ref : 'User',
        required: true 
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    status:{
        type: String,
        enum : ['Active', 'Completed', 'Dropped'],
        default: 'Active'
    },
    completedAt:{
        type: Date,
        Default: null
    },
    enrolledAt:{
        type: Date,
        Default: Date.now
    }
},{
    timestamps: true
});

enrollmentSchema.index({user:1 , course: 1},{unique:true});
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
