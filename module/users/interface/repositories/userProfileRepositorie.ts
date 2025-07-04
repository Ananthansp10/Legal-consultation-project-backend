import { UserProfileEntitie } from "../../domain/userProfileEntity";


export interface UserProfileRepositorie{
    findUser(userId:any):Promise<any>;
    addProfile(data:UserProfileEntitie):Promise<any>;
    getProfile(userId:any):Promise<UserProfileEntitie | null>;
}