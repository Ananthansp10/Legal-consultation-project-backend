import express from 'express'
import { registerLawyer, signinLawyer } from '../module/auth/lawyer/interface/controller/lawyerAuthControl';
const router=express.Router()
import upload from '../config/multerConfig'

router.post('/signup',upload.array('files',2),registerLawyer)

router.post('/signin',signinLawyer)

module.exports=router;