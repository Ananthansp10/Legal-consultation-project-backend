import { LawyerSignup } from "../../domain/lawyerSignupEntitie";


export interface LawyerSignupRepo{
    findByEmail(email:string):Promise<LawyerSignup | null>;
    saveLawyer(data:LawyerSignup):Promise<LawyerSignup | null>;
    addNewPassword(email:string,password:string):Promise<boolean>;
}