

export interface LawyerSignup{
    name:string;
    email:string;
    password:string;
    specialization:[string];
    experience:string;
    barCouncilNumber:string;
    documents:[string];
    isBlock:boolean;
    verified:boolean;
    id ? : string;
}