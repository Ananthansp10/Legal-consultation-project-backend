import { LawyerListingRepo } from "../interface/repositories/lawyerListingRepositories";


export const getVerifiedLawyersApplication=async(lawyerRepo:LawyerListingRepo)=>{
    try {
       let result=await lawyerRepo.getVerifiedLawyers()
       return result;
    } catch (error) {
        throw error;
    }
}