import {UserSignup} from '../../domain/userSignup'
import mongoose, {Schema} from 'mongoose'

const userSchema=new Schema <UserSignup>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    googleId:{
        type:String
    },
    isActive:{
        type:Boolean,
        required:true
    },
    isBlock:{
        type:Boolean
    },
    createdAt:{
        type:Date
    }
})

export const UserModel=mongoose.model<UserSignup>("users",userSchema)