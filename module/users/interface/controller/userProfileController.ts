import { Request,Response } from "express"
import { userProfileCreateApplication } from "../../application/userProfileCreateApplication"
import { UserProfileMongoRepositorie } from "../../infrastructure/userMongoRepositories/userProfileMongoReositorie"
import { userProfileEditApplication } from "../../application/userProfileEditApplication"
import { UserProfileEditMongoRepositorie } from "../../infrastructure/userMongoRepositories/userProfileEditMongoRepositories"
import { getUserProfileApplication } from "../../application/getUserProfileApplication"

const userProfileMongoRepo=new UserProfileMongoRepositorie()
const userProfileEditMongoRepo=new UserProfileEditMongoRepositorie()

export const addUserProfile=async(req:any,res:Response)=>{
    try {
        const imageUrl=req.file.path
        const profileObj:any={
            userId:req.body.userId,
            name:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            gender:req.body.gender,
            DOB:req.body.DOB,
            proffession:req.body.proffession,
            company:req.body.company,
            profileImage:imageUrl,
            address:{street:req.body.street,city:req.body.city,state:req.body.state,country:req.body.country,zipCode:req.body.zipCode}
        }
        await userProfileCreateApplication(profileObj,userProfileMongoRepo)
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

export const getUserProfile=async(req:Request,res:Response)=>{
    try {
        let result=await getUserProfileApplication(req.params.userId,userProfileMongoRepo)
        if(result){
            res.status(200).json({success:true,message:"Data found successfully",data:result})
        }else{
            res.status(200).json({success:false,message:"Data not found"})
        }
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message || "Something went wrong"})
    }
}