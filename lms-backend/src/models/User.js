/*  User Model for Login */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/* 
User Schema Definitions
*/
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: []
    },
    password:{
        type: String,
        unique: true,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters.'],
        select: false // you can't include password in queries by default
    },
    //Optional
    googleId:{
        type: String,
        unique: true,
        sparse: true //allows undefined values
    },
    //Profile information
    firstName:{
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName:{
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannor exceed 50 characters']
    },
    avatar:{
        type: String,
        default: null,
    },

    //User role
    role:{
        type: String,
        enum: ['Student', 'Faculty', 'Admin'],
        default: 'Student',
    },

    //Account Status
    isActive:{
        type: Boolean,
        default: true
    },
    emailVerified:{
        type: Boolean,
        default: false
    },

}, {
    // Schema options
    timestamps: true, //for created and updated
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});
userSchema.virtual('fullName').get(function(){
    return '${this.firstName} ${this.lastName}';
});

userSchema.index({email:1});
userSchema.index({role:1});
//Hash Password
userSchema.pre('save', async function(next){
    //if password is modified
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(12)
        this.password= await bcrypt.hash(this.password, salt);
        next();
    } catch(error){
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
};

userSchema.method.tosafeObject = function(){
    return{
        id: this.id,
        email: this.email,
        firstName: this.firstName,
        fullName: this.fullName,
        avatar: this.avatar,
        isActive: this.isActive,
        emailVerified: this.emailVerified,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

// find user by email
userSchema.statics.findByEmailL = function(email){
    return this.findOne({email: email.lowercase()});
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default userSchema;