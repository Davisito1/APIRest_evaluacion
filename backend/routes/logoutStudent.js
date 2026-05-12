import express from "express"
import logoutStudentController from "../controllers/logoutStudentController.js"

const router = express.Router()

router.route("/").post(logoutStudentController.logout)

export default router