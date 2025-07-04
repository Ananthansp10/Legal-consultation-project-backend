import { UserProfileRepositorie } from "../interface/repositories/userProfileRepositorie";


export const getUserProfileApplication=async(userId:any,userProfileRepo:UserProfileRepositorie)=>{
    try {
        return await userProfileRepo.getProfile(userId)
    } catch (error) {
        throw error;
    }
}