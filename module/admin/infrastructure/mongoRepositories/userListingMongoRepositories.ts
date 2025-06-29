import { response } from "express";
import { UserModel } from "../../../auth/user/infrastructure/model/userModel";
import { UserListingRepo } from "../../interface/repositories/userListingReositories";


export class UserListingMongoRepositories implements UserListingRepo{

    async getUsers(): Promise<any[]> {
        let result=await UserModel.find().sort({createdAt:-1})
        return result;
    }

    async unBlockUser(userId: any): Promise<boolean> {
        return UserModel.findByIdAndUpdate({_id:userId},{$set:{isBlock:false}}).then((response)=>!!response);
    }

    async blockUser(userId: any): Promise<boolean> {
        return UserModel.findByIdAndUpdate({_id:userId},{$set:{isBlock:true}}).then((response)=>!!response)
    }
}