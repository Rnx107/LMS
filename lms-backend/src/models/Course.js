/*  Course Model  */
import mongoose from 'mongoose';

const courseSchema = new mongoose.courseSchema({
    title: {
        type: String,
        required: [true, 'course title is required'],
        maxlength: [200, 'title cannot exceed 200 characters'],
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        maxlength: [6000, 'Description cannot exceed 6000 characaters']
    },
    thumbnail: {
        type: String,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //For reference to User Model
        required: true,
    }

},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

coirseSchema.virtual('enrollmentCount',{
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'course',
    count: true,
});

courseSchema.virtual('teacherInfo',{
    ref: 'User',
    localField: 'teacher',
    foreignField: '_id',
    justOne: true,

});

courseSchema.index({teacher:1});
courseSchema.index({title:'text'})

const course = mongoose.model('Course', courseSchema);
export default course;


