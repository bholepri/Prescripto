import express from 'express'
import { getProfile, loginUser, registerUser , updateProfile ,bookAppointment ,listAppointment ,cancelAppointments,paymentRazorpay,verifyRazorpay, saveRecords,getRecords ,addReview,allReview} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
// import upload from '../middlewares/multer.js'
import {upload} from '../config/cloudinary.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

userRouter.post('/save-records',upload.single('image'),authUser,saveRecords)
userRouter.get('/get-records',upload.single('image'),authUser,getRecords)

userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)

userRouter.post('/cancel-appointment',authUser,cancelAppointments)

userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)

userRouter.post('/add-review',authUser,addReview)
userRouter.get('/all-review',authUser,allReview)




export default userRouter