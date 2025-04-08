import express from 'express'
import { addDoctor,allDoctors,loginAdmin,appointmentsAdmin ,appointmentCancel,adminDashboard} from '../controllers/adminController.js'
// import uplod from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'
import {upload} from '../config/cloudinary.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)

adminRouter.get('/appointments',appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)

adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter