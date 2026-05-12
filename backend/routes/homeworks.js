import express from "express"
import homeworksController from "../controllers/homeworksController.js"

const router = express.Router()

router.route("/")
.get(homeworksController.getHomeworks)
.post(homeworksController.insertHomework)

router.route("/:id")
.put(homeworksController.updateHomework)
.delete(homeworksController.deleteHomework)

export default router