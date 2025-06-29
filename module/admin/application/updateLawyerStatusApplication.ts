import { LawyerListingRepo } from "../interface/repositories/lawyerListingRepositories";


export const updateLawyerStatusApplication=async(lawyerId:any,status:string,lawyerRepo:LawyerListingRepo)=>{
    try {
       if(status=='unblock'){
            await lawyerRepo.unBlockLawyer(lawyerId)
            return 'unblock'
       }else{
            await lawyerRepo.blockLawyer(lawyerId)
            return 'block'
       }
    } catch (error) {
        throw error;
    }
}