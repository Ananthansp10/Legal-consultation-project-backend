
export const adminSigninApplication=(data:any)=>{
    const admin_Email=process.env.ADMIN_EMAIL
    const admin_Password=process.env.ADMIN_PASSWORD
       let isEmailMatch= data.email === admin_Email ? true : false
       if(isEmailMatch){
            const isPasswordMatch= data.password === admin_Password ? true : false
            if(isPasswordMatch){
                return true;
            }else{
                const error:any=new Error("Password is wrong")
                error.statusCode=401
                throw error;
            }
       }else{
            const error:any=new Error("Email is invalid")
            error.statusCode=401
            throw error;
       }
}