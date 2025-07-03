

interface Address{
    street:string;
    country:string;
    state:string;
    city:string;
}

interface Education{
    degree:string;
    university:string;
    year:string;
}

interface PersonalInfo{
    name:string;
    email:string;
    phoneNumber:string;
    DOB:string;
    gender:string;
    address:Address;
    language:string[];
    profileImage:string;
}

interface ProffessionalInfo{
    practiceAreas:string[];
    barRegisterNumber:string;
    experience:string;
    courtName:string;
    workLocation:string;
    fee:string;
    education:Education;
    documents:string[];
}

export interface LawyerProfileEntity{
    _id ? :any
    lawyerId:any;
    personalInfo:PersonalInfo;
    proffessionalInfo:ProffessionalInfo;
}