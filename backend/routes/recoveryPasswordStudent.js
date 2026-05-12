import express from "express"
import recoveryPasswordStudentController from "../controllers/recoveryPasswordStudentController.js"

const router = express.Router()

router.route("/requestCode", recoveryPasswordStudentController.requestCode)
router.route("/verifyCode", recoveryPasswordStudentController.verifyCode)
router.route("/newPassword", recoveryPasswordStudentController.newPassword)

export default router