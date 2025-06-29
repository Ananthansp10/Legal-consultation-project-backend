import { Request,Response } from "express"
import { LawyerListingMongoRepositories } from "../../infrastructure/mongoRepositories/lawyerListingMongoRepositories";
import { unverifiedLawyersApplication } from "../../application/unverifiedLawyersListingApplication";
import { verifyLawyer } from "../../application/verifyLawyerApplication";
import { getVerifiedLawyersApplication } from "../../application/getVerifiedLawyersApplication";
import { updateLawyerStatusApplication } from "../../application/updateLawyerStatusApplication";

const lawyerListingMongoRepo=new LawyerListingMongoRepositories()

export const unverifiedLawyers=async(req:Request,res:Response)=>{
    try {
       let result=await unverifiedLawyersApplication(lawyerListingMongoRepo)
       res.status(200).json({success:true,message:"Lawyer data found successfully",data:result})
    } catch (error) {
        res.status(500).json({success:true,message:"No data found"})
    }
}

export const verifyLawyerStatus=async(req:Request,res:Response)=>{
    try {
        let result=await verifyLawyer(req.params.lawyerId,req.params.status,req.params.reason,lawyerListingMongoRepo)
        if(result=='approved'){
            res.status(200).json({success:true,message:"Lawyer has been Approved"})
        }else{
            res.status(200).json({success:true,message:"Lawyer has been Rejected"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}

export const verifiedLawyers=async(req:Request,res:Response)=>{
    try {
        let result=await getVerifiedLawyersApplication(lawyerListingMongoRepo)
        res.status(200).json({success:true,message:"Data found successfully",data:result})
    } catch (error) {
       res.status(500).json({success:false,message:"Something went wrong"}) 
    }
}

export const updateLawyerStatus=async(req:Request,res:Response)=>{
    try {
        let result:any=await updateLawyerStatusApplication(req.params.lawyerId,req.params.status,lawyerListingMongoRepo)
        if(result=='unblock'){
            res.status(200).json({success:true,message:"Unblocked successfully"})
        }else{
            res.status(200).json({success:true,message:"Blocked successfully"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}