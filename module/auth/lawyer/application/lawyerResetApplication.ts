import { LawyerSignupRepo } from "../interface/lawyerRepositories/lawyerSignupRepo";
const bcrypt=require('bcrypt')

export const resetPasswordApplication=async(email:string,oldPassword:string,newPassword:string,lawyerRepo:LawyerSignupRepo)=>{
    try {
       let emailExist:any=await lawyerRepo.findByEmail(email)
       if(!emailExist){
            const error:any=new Error("Invalid email")
            error.statusCode=401
            throw error;
       }else{
            let isPasswordMatch=await bcrypt.compare(oldPassword,emailExist.password)
            if(!isPasswordMatch){
                const error:any=new Error("Old password is not correct")
                error.statusCode=401
                throw error;
            }else{
                let hashedPassword=await bcrypt.hash(newPassword,10)
                await lawyerRepo.addNewPassword(email,hashedPassword)
                return;
            }
       }
    } catch (error) {
        throw error;
    }
}