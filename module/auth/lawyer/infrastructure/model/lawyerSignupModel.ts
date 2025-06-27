import { Schema } from "mongoose";
import { LawyerSignup } from "../../domain/lawyerSignupEntitie";
import mongoose from "mongoose";

const lawyerSignupSchema=new Schema<LawyerSignup>({
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
        required:true
    },
    specialization:[{
        type:String,
    }],
    experience:{
        type:String,
        required:true
    },
    barCouncilNumber:{
        type:String,
        required:true
    },
    documents:[
        {
            type:String
        }
    ],
    isBlock:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

export const LawyerModel=mongoose.model<LawyerSignup>("lawyer",lawyerSignupSchema)