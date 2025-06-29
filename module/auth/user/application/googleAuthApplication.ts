import { UserSignup } from "../domain/userSignup";
import { SignupMongoRepo } from "../infrastructure/monoRepositories/signupMongoRepositories";


export const googelAuthApplication=async(data:any,userSignupRepo:SignupMongoRepo)=>{

        let emailExist=await userSignupRepo.findByEmail(data.email)
        if(emailExist && !emailExist.googleId){
          let error:any=new Error('Email already exist')
          error.statusCode=409
          throw error;
        }else if(emailExist && emailExist.googleId){
            if(emailExist.isBlock){
                let error:any=new Error('Your account has been blocked')
                error.statusCode=403
                throw error;
            }
            return emailExist;
        }
        else{
            let userObj:UserSignup={
                name:data.name,
                email:data.email,
                googleId:data.googleId,
                isActive:true,
                isBlock:false,
                createdAt:new Date()
            }
            let result=await userSignupRepo.create(userObj)
            return result;
        }
    
}