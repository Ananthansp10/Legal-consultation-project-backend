import { LawyerProfileEntity } from "../../domain/lawyerProfileEntity";


export interface LawyerProfileAddRepositorie{
    findLawyer(lawyerId:string):Promise<any>;
    saveLawyerProfile(data:LawyerProfileEntity):Promise<any>;
}