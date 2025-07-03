import { Request,Response } from "express"
import { LawyerProfileAddMongoRepositorie } from "../../infrastructure/mongoRepositories/lawyerProfileAddMongoRepositorie"
import { lawyerAddProfileApplication } from "../../application/lawyerAddProfileApplication"
import { LawyerProfileEditMongoRepositorie } from "../../infrastructure/mongoRepositories/lawyerProfileEditMongoRepositorie"
import { lawyerProfileEditApplication } from "../../application/lawyerProfileEditApplication"

const lawyerProfileAddMongoRepo=new LawyerProfileAddMongoRepositorie()
const lawyerProfileEditMongoRepo=new LawyerProfileEditMongoRepositorie()

export const addLawyerProfile=async(req:Request,res:Response)=>{
    try {
        await lawyerAddProfileApplication(req.body,lawyerProfileAddMongoRepo)
        res.status(200).json({success:true,message:"Profile created successfully"})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message || "Something went wrong"})
    }
}

export const editLawyerProfile=async(req:Request,res:Response)=>{
    try {
        await lawyerProfileEditApplication(req.body,lawyerProfileEditMongoRepo)
        res.status(200).json({success:true,message:"Profile edited successfully"})
    } catch (error:any) {
        res.status(error.statusCode | 500).json({success:false,message:error.message || "Something went wrong"})
    }
}