import { LawyerListingRepo } from "../interface/repositories/lawyerListingRepositories";


export const verifyLawyer=async(lawyerId:any,status:string,reason:string,lawyerRepo:LawyerListingRepo)=>{
    try {
        if(status=='approve'){
            await lawyerRepo.approveLawyer(lawyerId)
            return 'approved'
        }else{
            await lawyerRepo.rejectLawyer(lawyerId,reason)
            return 'rejected'
        }
    } catch (error) {
        throw error;
    }
}