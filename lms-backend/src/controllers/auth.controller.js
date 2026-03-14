/* 
Authentication COntroller
*/

import {validationResult} from '/express-validator';
import User from '../models/User';
import {generateTokens} from '../utils/jwt';

export const register = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role: role || 'Student',
    });
    const tokens = generateTokens(user);
    res.status(201).json({
        success: true,
        message: 'Registration Successful',
        data:{
            user: user.toSafeObject(),
            ...tokens,
        },
    });
    } catch (error){
        next(error);
    }
};

/* 
@desc Login user
@route POST /api/auth.login
@access
*/

export const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const {email, password} = req.body;
        
        //Find user with password
        const user = await User.findOne({email}).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
    }
}