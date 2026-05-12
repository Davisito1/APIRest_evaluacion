import express from "express"
import studentsController from "../controllers/studentsController.js"

const router = express.Router()

router.route("/")
.get(studentsController.getStudents)

router.route("/:id")
.put(studentsController.updateStudent)
.delete(studentsController.deteleStudent)

export default router