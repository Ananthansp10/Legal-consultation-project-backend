import { Request,Response } from "express"
import { getUsersApplication } from "../../application/getUsersApplication"
import { UserListingMongoRepositories } from "../../infrastructure/mongoRepositories/userListingMongoRepositories"
import { updateUserStatusApplication } from "../../application/updateUserStatusApplication"

const userListingMongoRepo=new UserListingMongoRepositories()

export const getUsers=async(req:Request,res:Response)=>{
    try {
        let result=await getUsersApplication(userListingMongoRepo)
        res.status(200).json({success:true,message:"Data found successfully",data:result})
    } catch (error) {
       res.status(500).json({success:false,message:"Something went wrong"}) 
    }
}

export const updateUserStatus=async(req:Request,res:Response)=>{
    try {
        let result=await updateUserStatusApplication(req.params.userId,req.params.status,userListingMongoRepo)
        if(result=='unblock'){
            res.status(200).json({success:true,message:"Unblock successfully"})
        }else{
            res.status(200).json({success:true,message:"Blocked successfully"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}