import express from 'express'
import { forgotPasswordEmail, logoutLawyer, registerLawyer, resetPassword, saveNewPassword, signinLawyer } from '../module/auth/lawyer/interface/controller/lawyerAuthControl';
const router=express.Router()
import upload from '../config/multerConfig'
import { verifyToken } from '../middlewares/authorizationMiddleware';
import { roleCheck } from '../middlewares/roleCheckingMiddleware';
import { isBlock } from '../middlewares/blockCheckingMiddleware';

router.post('/signup',upload.array('files',2),registerLawyer)

router.post('/signin',signinLawyer)

router.post('/logout',logoutLawyer)

router.post('/forgot-password-email',forgotPasswordEmail)

router.post('/new-password',saveNewPassword)

router.post('/reset-password',verifyToken,roleCheck,isBlock,resetPassword)

module.exports=router;