import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const roleCheck=(req:Request,res:Response,next:NextFunction)=>{
    try {
        let accessToken:string | undefined
        let refreshToken:string | undefined

        const role = req.body?.role || req.params?.role || req.query?.role


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

        if(!refreshToken){
            res.status(401).json({success:false,message:"Token is missing",isUnAuth:true,tokenExpired:true})
            return;
        }

        if(!accessToken){
            res.status(401).json({success:false,message:"Token is missing",isUnAuth:true,tokenExpired:true})
            return;
        }
        
        let decodeToken:any=jwt.decode(accessToken)
        if(decodeToken && decodeToken.role==role){
            return next();
        }else{
            res.status(401).json({success:false,message:"User is not valid",isUnAuth:true})
            return;
        }

    } catch (error) {
        throw error;
    }
}