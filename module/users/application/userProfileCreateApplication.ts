import { UserProfileEntitie } from "../domain/userProfileEntity";
import { UserProfileRepositorie } from "../interface/repositories/userProfileRepositorie";


export const userProfileCreateApplication=async(data:UserProfileEntitie,userProfileRepo:UserProfileRepositorie)=>{
    try {
        let userExit:any=await userProfileRepo.findUser(data.userId)
        if(!userExit){
            const error:any=new Error("User not found ! Invalid user")
            error.statusCode=401
            throw error;
        }else{
            await userProfileRepo.addProfile(data)
            return
        }
    } catch (error) {
        throw error;
    }
}