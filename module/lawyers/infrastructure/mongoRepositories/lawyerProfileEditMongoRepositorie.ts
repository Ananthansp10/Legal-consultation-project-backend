import { LawyerProfileEntity } from "../../domain/lawyerProfileEntity";
import { LawyerProfileEditRepositorie } from "../../interface/repositories/lawyerProfileEditRepositorie";
import { lawyerProfileModel } from "../models/lawyerProfileModel";


export class LawyerProfileEditMongoRepositorie implements LawyerProfileEditRepositorie{

    async findLawyerProfile(lawyerId: any): Promise<any> {
        return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }

    async editLawyerProfile(lawyerId: any,data:LawyerProfileEntity): Promise<any> {
        return await lawyerProfileModel.updateOne({lawyerId:lawyerId},{$set:data})
    }
}