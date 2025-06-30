import { sendForgotPasswordEmail } from "../../../../utils/forgotPasswordMail";
import { LawyerSignupRepo } from "../interface/lawyerRepositories/lawyerSignupRepo";


export const LawyerForgotPasswordEmailSend=async(email:string,lawyerRepo:LawyerSignupRepo)=>{
    try {
        let emailExist=await lawyerRepo.findByEmail(email)
        if(!emailExist){
            const error:any=new Error('Email is invalid')
            error.statusCode=401
            throw error;
        }else{
            sendForgotPasswordEmail(email,emailExist.name)
            return;
        }
    } catch (error) {
        throw error;
    }
}