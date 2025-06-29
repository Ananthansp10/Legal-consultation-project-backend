import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    try {
        let accessToken:string | undefined
        let refreshToken:string | undefined

        const role=req.body?.role || req.params?.role || req.query?.role

        if(role=='user'){
            accessToken=req.cookies?.accessToken
            refreshToken=req.cookies?.refreshToken
        }else if(role=='lawyer'){
            accessToken=req.cookies?.lawyerAccessToken
            refreshToken=req.cookies?.lawyerRefreshToken
        }else{
            accessToken=req.cookies?.adminAccessToken
            refreshToken=req.cookies?.adminRefreshToken
        }

        if(!accessToken || !refreshToken){
            res.status(401).json({success:false,message:"Token is missing",isUnAuth:true,tokenExpired:true})
            return;
        }else{
            let decodeAccessToken:any=jwt.decode(accessToken)
            if(!decodeAccessToken){
                res.status(401).json({status:false,message:"Invalid token structure",isUnAuth:true})
            }
            if(Date.now()>decodeAccessToken.exp){
                try {
                    let verifyRefreshToken:any=jwt.verify(refreshToken!,process.env.JWT_REFRESH_TOKEN_SECRET!)
                    let newAccessToken:any=jwt.sign({id:verifyRefreshToken.id,role:verifyRefreshToken.role},process.env.JWT_ACCESS_TOKEN_SECRET!,{expiresIn:"30m"})
                    if(verifyRefreshToken.role=='user'){
                        res.cookie('accessToken',newAccessToken,{
                            httpOnly:true,
                            secure:true,
                            sameSite:'none',
                            maxAge:1000 * 60 * 60 * 24 * 7
                        })
                    }else if(verifyRefreshToken.role=='lawyer'){
                        res.cookie('lawyerAccessToken',newAccessToken,{
                            httpOnly:true,
                            secure:true,
                            sameSite:'none',
                            maxAge:1000 * 60 * 60 * 24 * 7
                        })
                    }else{
                        res.cookie('adminAccessToken',newAccessToken,{
                            httpOnly:true,
                            secure:true,
                            sameSite:'none',
                            maxAge:1000 * 60 * 60 * 24 * 7
                        })
                    }
                    (req as any).role=verifyRefreshToken.role
                    return next();
                } catch (error:any) {
                    res.status(401).json({success:false,message:"Invalid refresh token",isUnAuth:true})
                    return;
                }
            }else{
                try {
                    let verifyAccessToken:any=jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET!);
                    (req as any).role=verifyAccessToken.role
                    return next();
                } catch (error) {
                    res.status(401).json({status:false,message:"Invalid access token",isUnAuth:true})
                    return;
                }
            }
    }
    } catch (error) {
        throw error;
    }
}