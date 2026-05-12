import express from "express"
import registerStudentsController from "../controllers/registerStudentsController.js"

const router = express.Router()

router.route("/").post(registerStudentsController.register)
router.route("/verifyCodeEmail").post(registerStudentsController.verifyCode)

export default router