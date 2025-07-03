import { LawyerProfileEntity } from "../domain/lawyerProfileEntity";
import { LawyerProfileAddRepositorie } from "../interface/repositories/lawyerProfileAddRepositorie";


export const lawyerAddProfileApplication=async(data:LawyerProfileEntity,lawyerProfileRepo:LawyerProfileAddRepositorie)=>{
    try {
        let lawyerExist:any=await lawyerProfileRepo.findLawyer(data.lawyerId)
        if(!lawyerExist){
            const error:any=new Error("Lawyer not exist ! something went wrong")
            error.statusCode=401
            throw error;
        }else{
            return await lawyerProfileRepo.saveLawyerProfile(data)
        }
    } catch (error) {
        throw error;
    }
}