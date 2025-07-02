import express from "express";
import { changePaasword, checkAuth, forgotPassword, getGoogleAuthDetails, googleAuthentication, logoutUser, otpVerification, resendOtp, resetPassword, signin } from "../module/auth/user/interface/controllers/userAuthController";
import { verifyToken } from "../middlewares/authorizationMiddleware";
import { roleCheck } from "../middlewares/roleCheckingMiddleware";
import { session } from "passport";
import { isBlock } from "../middlewares/blockCheckingMiddleware";
import { addUserProfile, editUserProfile } from "../module/users/interface/controller/userProfileController";
const router=express.Router()
const {registerUser}=require('../module/auth/user/interface/controllers/userAuthController')
const passport=require('passport')

router.post('/signup',registerUser)

router.post('/otp-verification',otpVerification)

router.post('/resend-otp',resendOtp)

router.post('/signin',signin)

router.post('/logout/:userId',logoutUser)

router.post('/forgot-password',forgotPassword)

router.post('/change-password',changePaasword)

router.post('/reset-password',verifyToken,roleCheck,isBlock,resetPassword)

router.post('/checkAuth',verifyToken,roleCheck,isBlock,checkAuth)

router.get("/auth/google",passport.authenticate("google", {scope: ["profile", "email"],session:false}));

router.get("/auth/google/callback",passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/googleFail" }),googleAuthentication);

router.post('/getGoogleAuthDetails',getGoogleAuthDetails)

router.post('/add-profile',addUserProfile)

router.put('/edit-profile',editUserProfile)

module.exports=router;