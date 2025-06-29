import { UserListingRepo } from "../interface/repositories/userListingReositories";


export const updateUserStatusApplication=async(userId:any,status:string,userRepo:UserListingRepo)=>{
    try {
        if(status=='unblock'){
            await userRepo.unBlockUser(userId)
            return 'unblock';
        }else{
            await userRepo.blockUser(userId)
            return 'block';
        }
    } catch (error) {
        throw error;
    }
}