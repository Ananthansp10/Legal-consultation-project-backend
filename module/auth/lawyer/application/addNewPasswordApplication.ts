import { LawyerSignupRepo } from "../interface/lawyerRepositories/lawyerSignupRepo";
const bcrypt=require('bcrypt')

export const addNewPasswordApplication=async(email:string,password:string,lawyerRepo:LawyerSignupRepo)=>{
    try {
        let emailExist=await lawyerRepo.findByEmail(email)
        if(!emailExist){
            const error:any=new Error("Cant't set new password try again")
            error.statusCode=401
            throw error;
        }else{
            let hashedPassword=await bcrypt.hash(password,10)
            await lawyerRepo.addNewPassword(email,hashedPassword)
            return;
        }
    } catch (error) {
        throw error;
    }
}