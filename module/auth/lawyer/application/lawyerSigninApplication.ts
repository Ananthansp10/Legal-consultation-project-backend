import { LawyerSigninEntity } from "../domain/lawyerSigninEntitie";
import { LawyerSignupRepo } from "../interface/lawyerRepositories/lawyerSignupRepo";
const bcrypt=require('bcrypt')

export const lawyerSigninApplication=async(data:LawyerSigninEntity,lawyerSigninRepo:LawyerSignupRepo)=>{
    try {
        let emailExist=await lawyerSigninRepo.findByEmail(data.email)
        if(!emailExist){
            const error:any=new Error("Invalid email")
            error.statusCode=401
            throw error;
        }else{
            if(emailExist && emailExist.isBlock){
                const error:any=new Error("Your account has been blocked")
                error.statusCode=401
                throw error;
            }
            let isPasswordMatch=await bcrypt.compare(data.password,emailExist.password)
            if(!isPasswordMatch){
                const error:any=new Error("Password is wrong")
                error.statusCode=401
                throw error;
            }else{
                if(!emailExist.verified){
                const error:any=new Error('Your account is not verified')
                error.statusCode=403
                throw error;
            }else{
                return emailExist;
            }
            }
        }
    } catch (error) {
        throw error;
    }
}