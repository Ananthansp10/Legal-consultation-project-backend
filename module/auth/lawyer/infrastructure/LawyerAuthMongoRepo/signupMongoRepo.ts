import { LawyerSignup } from "../../domain/lawyerSignupEntitie";
import { LawyerSignupRepo } from "../../interface/lawyerRepositories/lawyerSignupRepo";
import { LawyerModel } from "../model/lawyerSignupModel";

export class LawyerSignupMongoRepo implements LawyerSignupRepo{

    async findByEmail(email: string): Promise<LawyerSignup | null> {
        let result=await LawyerModel.findOne({email:email})
        return result;
    }

    async saveLawyer(data: LawyerSignup): Promise<LawyerSignup | null> {
        return await LawyerModel.create(data)
    }

   async addNewPassword(email: string, password: string): Promise<boolean> {
        return LawyerModel.updateOne({email:email},{$set:{password:password}}).then((response)=>!!response)
    }
    
}