import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { UserModel } from "../module/auth/user/infrastructure/model/userModel"
import { LawyerModel } from "../module/auth/lawyer/infrastructure/model/lawyerSignupModel"

export const isBlock=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const role=req.body.role || req.params.role || req.query.role
        let accessToken:any
        if(role=='admin'){
           return next();
        }else{
            if(role=='user'){
                accessToken=req.cookies.accessToken
            }else{
                accessToken=req.cookies.lawyerAccessToken
            }
            let decodeToken:any=jwt.decode(accessToken)
            if(decodeToken.role=='user'){
                let userDetails:any=await UserModel.findById({_id:decodeToken.id})
                if(userDetails.isBlock){
                    res.clearCookie('accessToken',{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none'
                    })
                    res.clearCookie('refreshToken',{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none'
                    })
                    res.status(401).json({success:false,message:"Account is blocked",isBlock:true})
                    return;
                }else{
                    return next();
                }
            }else{
                let lawyerDetails:any=await LawyerModel.findById({_id:decodeToken.id})
                if(lawyerDetails.isBlock){
                    res.clearCookie('lawyerAccessToken',{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none'
                    })
                    res.clearCookie('lawyerRefreshToken',{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none'
                    })
                    res.status(401).json({success:false,message:"Account is blocked",isBlock:true})
                    return;
                }else{
                    return next();
                }
            }
        }
    } catch (error) {
        throw error;
    }
}