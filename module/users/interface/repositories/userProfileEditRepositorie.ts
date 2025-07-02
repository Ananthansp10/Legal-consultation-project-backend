import { UserProfileEntitie } from "../../domain/userProfileEntity";


export interface UserProfileEditRepositorie{
    findProfile(userId:any):Promise<any>;
    editProfile(userId:any,data:UserProfileEntitie):Promise<any>;
}