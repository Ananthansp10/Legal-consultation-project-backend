import { UserProfileEntitie } from "../../domain/userProfileEntity";
import { UserProfileEditRepositorie } from "../../interface/repositories/userProfileEditRepositorie";
import { userProfileModel } from "../model/userProfileModel";


export class UserProfileEditMongoRepositorie implements UserProfileEditRepositorie{

    async findProfile(userId: any): Promise<any> {
        return await userProfileModel.findOne({userId:userId})
    }

    async editProfile(userId: any, data: UserProfileEntitie): Promise<any> {
        return await userProfileModel.updateOne({userId:userId},{$set:data})
    }
}