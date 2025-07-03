import { LawyerProfileEntity } from "../../domain/lawyerProfileEntity";


export interface LawyerProfileEditRepositorie{
    findLawyerProfile(lawyerId:any):Promise<any>;
    editLawyerProfile(lawyerId:any,data:LawyerProfileEntity):Promise<any>;
}