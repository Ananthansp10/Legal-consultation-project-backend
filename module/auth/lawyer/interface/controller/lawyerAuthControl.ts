import { Request,Response } from "express"
import { lawyerSignupApplication } from "../../application/lawyerSignupApplication"
import { LawyerSignupMongoRepo } from "../../infrastructure/LawyerAuthMongoRepo/signupMongoRepo"
import { lawyerSigninApplication } from "../../application/lawyerSigninApplication"
import { generateAccessToken, generateRefreshToken } from "../../../../../utils/tokenGenerate"
import { LawyerForgotPasswordEmailSend } from "../../application/lawyerForgotPasswordEmailSend"
import { addNewPasswordApplication } from "../../application/addNewPasswordApplication"
import { resetPasswordApplication } from "../../application/lawyerResetApplication"

const lawyerSignupMongoRepo=new LawyerSignupMongoRepo()

export const registerLawyer=async(req:any,res:Response)=>{
    try {
        const imageUrl=req.files.map((file:any)=>file.path)
        const dataObj:any={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            experience:req.body.experience,
            barCouncilNumber:req.body.barCouncilNumber,
            specialization:req.body.specialization,
            documents:imageUrl
        }
        let result=await lawyerSignupApplication(dataObj,lawyerSignupMongoRepo)
        res.status(200).json({success:true,message:"Account created successfully",data:result})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message})
    }
}

export const signinLawyer=async(req:Request,res:Response)=>{
    try {
        let result:any=await lawyerSigninApplication(req.body,lawyerSignupMongoRepo)
        if(result){
        let accessToken=generateAccessToken(result._id,'lawyer')
        let refreshToken=generateRefreshToken(result._id,'lawyer')
        res.cookie('lawyerAccessToken',accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1000 * 60 * 60 * 24 * 7
        })
        res.cookie('lawyerRefreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1000 * 60 * 60 * 24 * 7
        })
        res.status(200).json({success:true,message:"Login successfully",data:result})
        }
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message})
    }
}

export const logoutLawyer=async(req:Request,res:Response)=>{
    try {
        res.clearCookie('lawyerAccessToken',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        res.clearCookie('lawyerRefreshToken',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        res.status(200).json({status:true,message:"logout successfully"})
    } catch (error) {
        res.status(500).json({status:false,message:"Something went wrong"})
    }
}

export const forgotPasswordEmail=async(req:Request,res:Response)=>{
    try {
        await LawyerForgotPasswordEmailSend(req.body.email,lawyerSignupMongoRepo)
        res.status(200).json({success:true,message:'Reset password link has been send to your email'})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message})
    }
}

export const saveNewPassword=async(req:Request,res:Response)=>{
    try {
        await addNewPasswordApplication(req.body.email,req.body.password,lawyerSignupMongoRepo)
        res.status(200).json({success:true,message:"Password has changed successfully"})
    } catch (error:any) {
        res.status(error.statusCode).json({success:false,message:error.message})
    }
}

export const resetPassword=async(req:Request,res:Response)=>{
    try {
        await resetPasswordApplication(req.body.email,req.body.oldPassword,req.body.newPassword,lawyerSignupMongoRepo)
        res.status(200).json({success:true,message:"New password set successully"})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message})
    }
}