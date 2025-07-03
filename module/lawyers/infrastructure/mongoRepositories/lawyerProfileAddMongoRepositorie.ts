import { LawyerModel } from "../../../auth/lawyer/infrastructure/model/lawyerSignupModel";
import { LawyerProfileEntity } from "../../domain/lawyerProfileEntity";
import { LawyerProfileAddRepositorie } from "../../interface/repositories/lawyerProfileAddRepositorie";
import { lawyerProfileModel } from "../models/lawyerProfileModel";


export class LawyerProfileAddMongoRepositorie implements LawyerProfileAddRepositorie{

    async findLawyer(lawyerId: string): Promise<any> {
        return await LawyerModel.findById({_id:lawyerId})
    }

    async saveLawyerProfile(data: LawyerProfileEntity): Promise<any> {
        return await lawyerProfileModel.create(data)
    }
}