import express from 'express'
import { adminSignin, logoutAdmin } from '../module/auth/admin/interface/adminAuthController';
import { unverifiedLawyers, updateLawyerStatus, verifiedLawyers, verifyLawyerStatus } from '../module/admin/interface/controllers/lawyerListingController';
import { verifyToken } from '../middlewares/authorizationMiddleware';
import { roleCheck } from '../middlewares/roleCheckingMiddleware';
import { getUsers, updateUserStatus } from '../module/admin/interface/controllers/userListingController';
const router=express.Router()

router.post('/signin',adminSignin)

router.post('/logout',logoutAdmin)

router.get('/unverifiedLawyers',verifyToken,roleCheck,unverifiedLawyers)

router.patch('/verification/:lawyerId/:status/:reason',verifyToken,roleCheck,verifyLawyerStatus)

router.get('/getlawyers',verifyToken,roleCheck,verifiedLawyers)

router.get('/getusers',verifyToken,roleCheck,getUsers)

router.patch('/lawyer/:lawyerId/:status',updateLawyerStatus)

router.patch('/user/:userId/:status',updateUserStatus)

module.exports=router;