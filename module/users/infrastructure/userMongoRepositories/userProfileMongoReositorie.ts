import { UserModel } from "../../../auth/user/infrastructure/model/userModel";
import { UserProfileEntitie } from "../../domain/userProfileEntity";
import { UserProfileRepositorie } from "../../interface/repositories/userProfileRepositorie";
import { userProfileModel } from "../model/userProfileModel";


export class UserProfileMongoRepositorie implements UserProfileRepositorie{

    async findUser(userId: any): Promise<any> {
        return await UserModel.findById({_id:userId})
    }

    async addProfile(data: UserProfileEntitie): Promise<any> {
        return await userProfileModel.create(data)
    }

    async getProfile(userId: any): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({userId:userId})
    }
}