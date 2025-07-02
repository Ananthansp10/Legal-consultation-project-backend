import { UserProfileEntitie } from "../domain/userProfileEntity";
import { UserProfileEditRepositorie } from "../interface/repositories/userProfileEditRepositorie";


export const userProfileEditApplication=async(data:any,userProfilEditRepo:UserProfileEditRepositorie)=>{
    try {
       let profileExist:any=await userProfilEditRepo.findProfile(data.userId)
       if(!profileExist){
            const error:any=new Error("Profile not exist")
            error.statusCode=401
            throw error;
       }else{
            let newObj:UserProfileEntitie={
                userId:data.userId,
                name:data.name,
                email:data.email,
                phoneNumber:data.phoneNumber,
                gender:data.gender,
                DOB:data.DOB,
                profession:data.profession,
                company:data.company,
                profileImage:data.profileImage,
                address:{
                    street:data.address.street,
                    city:data.address.city,
                    state:data.address.state,
                    country:data.address.country,
                    zipCode:data.address.zipCode
                }
            }
            await userProfilEditRepo.editProfile(data.userId,newObj)
       }
    } catch (error) {
        throw error;
    }
}