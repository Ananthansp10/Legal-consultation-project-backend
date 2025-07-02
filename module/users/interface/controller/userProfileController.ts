import { Request,Response } from "express"
import { userProfileCreateApplication } from "../../application/userProfileCreateApplication"
import { UserProfileMongoRepositorie } from "../../infrastructure/userMongoRepositories/userProfileMongoReositorie"
import { userProfileEditApplication } from "../../application/userProfileEditApplication"
import { UserProfileEditMongoRepositorie } from "../../infrastructure/userMongoRepositories/userProfileEditMongoRepositories"

const userProfileMongoRepo=new UserProfileMongoRepositorie()
const userProfileEditMongoRepo=new UserProfileEditMongoRepositorie()

export const addUserProfile=async(req:Request,res:Response)=>{
    try {
        await userProfileCreateApplication(req.body,userProfileMongoRepo)
        res.status(200).json({success:true,message:"Profile created successfully"})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message || "Something went wrong"})
    }
}

export const editUserProfile=async(req:Request,res:Response)=>{
    try {
        await userProfileEditApplication(req.body,userProfileEditMongoRepo)
        res.status(200).json({success:true,message:"Profile edited successfully"})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message || "Something went wrong"})
    }
}