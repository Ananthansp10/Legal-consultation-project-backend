import { UserListingRepo } from "../interface/repositories/userListingReositories";


export const getUsersApplication=async(userRepo:UserListingRepo)=>{
    try {
        let result=await userRepo.getUsers()
        return result;
    } catch (error) {
        throw error;
    }
}