import { LawyerSignup } from "../domain/lawyerSignupEntitie";
import { LawyerSignupRepo } from "../interface/lawyerRepositories/lawyerSignupRepo";
const bcrypt=require('bcrypt')

export const lawyerSignupApplication=async(data:LawyerSignup,lawyerRepo:LawyerSignupRepo)=>{
    try {
        let emailExist=await lawyerRepo.findByEmail(data.email)
        if(emailExist){
            const error: any = new Error("Email already exist");
            error.statusCode = 409;
            throw error;
        }else{
            let hashedPassword=await bcrypt.hash(data.password,10)
            let signupObj={...data,password:hashedPassword}
            return await lawyerRepo.saveLawyer(signupObj)
        }
    } catch (error) {
        throw error;
    }
}