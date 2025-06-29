import { Request,Response } from "express"
import { adminSigninApplication } from "../../../auth/admin/application/signinApplication"
import { generateAccessToken, generateRefreshToken } from "../../../../utils/tokenGenerate"

export const adminSignin=async(req:Request,res:Response)=>{
    try {
        let result=await adminSigninApplication(req.body)
        let accessToken=generateAccessToken('admin','admin')
        let refreshToken=generateRefreshToken('admin','admin')
        res.cookie('adminAccessToken',accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1000 * 60 * 60 * 24 * 7
        })
        res.cookie('adminRefreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:1000 * 60 * 60 * 24 * 7
        })
        res.status(200).json({success:true,message:"Login successfully",data:{name:"admin"}})
    } catch (error:any) {
        res.status(error.statusCode).json({success:false,message:error.message})
    }
}

export const logoutAdmin=(req:Request,res:Response)=>{
    try {
        res.clearCookie('adminAccessToken',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        res.clearCookie('adminRefreshToken',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        res.json({success:true,message:"Logout successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"something went wrong"})
    }
}