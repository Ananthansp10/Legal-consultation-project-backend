import { LawyerProfileEditRepositorie } from "../interface/repositories/lawyerProfileEditRepositorie";
import { lawyerAddProfileApplication } from "./lawyerAddProfileApplication";


export const lawyerProfileEditApplication=async(data:any,lawyerProfileEditRepo:LawyerProfileEditRepositorie)=>{
    try {
        let profileExist:any=await lawyerProfileEditRepo.findLawyerProfile(data.lawyerId)
        if(!profileExist){
            const error:any=new Error("Profile not exist")
            error.statusCode=401
            throw error;
        }else{
            let newObj:any={
                lawyerId:data.lawyerId,
                personalInfo:{
                    name:data.personalInfo.name,
                    email:data.personalInfo.email,
                    phoneNumber:data.personalInfo.phoneNumber,
                    DOB:data.personalInfo.DOB,
                    gender:data.personalInfo.gender,
                    address:{
                        street:data.personalInfo.address.street,
                        country:data.personalInfo.address.country,
                        state:data.personalInfo.address.state,
                        city:data.personalInfo.address.city
                    },
                    language:data.personalInfo.language,
                    profileImage:data.personalInfo.profileImage,
                    proffessionalInfo:profileExist.proffessionalInfo
                }
            }
            await lawyerProfileEditRepo.editLawyerProfile(data.lawyerId,newObj)
        }
    } catch (error) {
        throw error;
    }
}