

export interface UserListingRepo{
    getUsers():Promise<any[]>;
    unBlockUser(userId:any):Promise<boolean>;
    blockUser(userId:any):Promise<boolean>;
}