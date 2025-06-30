import { sendVerificationResultMail } from "../../../utils/lawyerVerificationEmail";
import { LawyerListingRepo } from "../interface/repositories/lawyerListingRepositories";


export const verifyLawyer=async(lawyerId:any,status:string,reason:string,lawyerRepo:LawyerListingRepo)=>{
    try {
        let lawyerDetails=await lawyerRepo.findLawyerById(lawyerId)
        if(status=='approve'){
            await lawyerRepo.approveLawyer(lawyerId)
            sendVerificationResultMail(lawyerDetails.email,lawyerDetails.name,status,reason)
            return 'approved'
        }else{
            await lawyerRepo.rejectLawyer(lawyerId,reason)
            sendVerificationResultMail(lawyerDetails.email,lawyerDetails.name,status,reason)
            await lawyerRepo.removeLawyer(lawyerId)
            return 'rejected'
        }
    } catch (error) {
        throw error;
    }
}