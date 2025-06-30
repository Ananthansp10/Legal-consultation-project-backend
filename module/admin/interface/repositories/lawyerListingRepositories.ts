

export interface LawyerListingRepo{
    findLawyer():Promise<any[]>;
    approveLawyer(lawyerId:any):Promise<boolean>;
    rejectLawyer(lawyerId:any,reason:string):Promise<boolean>;
    getVerifiedLawyers():Promise<any[]>;
    unBlockLawyer(lawyerId:any):Promise<boolean>;
    blockLawyer(lawyerId:any):Promise<boolean>;
    findLawyerById(id:any):Promise<any>;
    removeLawyer(id:any):Promise<boolean>;
}