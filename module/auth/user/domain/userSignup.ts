export interface UserSignup{
    name:string;
    email:string;
    password ? :string;
    phoneNumber ? :number;
    isActive:boolean;
    createdAt:Date;
    _id ? :string;
    googleId ? :string;
    isBlock:boolean;
}