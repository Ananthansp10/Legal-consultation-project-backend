import { response } from "express";
import { LawyerModel } from "../../../auth/lawyer/infrastructure/model/lawyerSignupModel";
import { LawyerListingRepo } from "../../interface/repositories/lawyerListingRepositories";


export class LawyerListingMongoRepositories implements LawyerListingRepo{

    async findLawyer(): Promise<any[]> {
        let result=await LawyerModel.find({verified:false,reason:{$exists:false}})
        return result;
    }

    async approveLawyer(lawyerId:any): Promise<boolean> {
         return LawyerModel.findByIdAndUpdate({_id:lawyerId},{$set:{verified:true}}).then((response)=>!!response)
    }

    async rejectLawyer(lawyerId: any, reason: string): Promise<boolean> {
        return LawyerModel.findByIdAndUpdate({_id:lawyerId},{$set:{reason:reason}}).then((response)=>!!response)
    }

    async getVerifiedLawyers(): Promise<any[]> {
        let result=await LawyerModel.find({verified:true}).sort({createdAt:-1})
        return result;
    }

    async unBlockLawyer(lawyerId: any): Promise<boolean> {
        return LawyerModel.findByIdAndUpdate({_id:lawyerId},{$set:{isBlock:false}}).then((response)=>!!response)
    }

    async blockLawyer(lawyerId: any): Promise<boolean> {
        return LawyerModel.findByIdAndUpdate({_id:lawyerId},{$set:{isBlock:true}}).then((response)=>!!response)
    }

}