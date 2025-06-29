import { LawyerListingRepo } from "../interface/repositories/lawyerListingRepositories";


export const unverifiedLawyersApplication=async(lawyerListingRepo:LawyerListingRepo)=>{
    try {
        let result=await lawyerListingRepo.findLawyer()
        if(result){
            return result;
        }
    } catch (error) {
        throw error;
    }
}