import { userRepositories } from "../interface/repositories/userRepositories";
const bcrypt=require('bcrypt')

export const resetPasswordApplication=async(data:any,userRepo:userRepositories)=>{
    try {
        let error:any=new Error()
        let user=await userRepo.findEmail(data.email)
        if(user){
            let isPassworMatch=await bcrypt.compare(data.oldPassword,user.password)
            if(!isPassworMatch){
                error.message="Old password is wrong"
                error.statusCode=400
                throw error;
            }else{
                let hashedPassword=await bcrypt.hash(data.newPassword,10)
                return await userRepo.saveNewPassword(data.email,hashedPassword)
            }
        }else{
            error.message="User not found"
            error.statusCode=400
            throw error;
        }
    } catch (error) {
        throw error;
    }
}