import express from "express"
import subjectCategorysController from "../controllers/subjectCategorysController.js"

const router = express.Router()

router.route("/")
.get(subjectCategorysController.getCategorys)
.post(subjectCategorysController.insertCategory)

router.route("/:id")
.put(subjectCategorysController.updateCategory)
.delete(subjectCategorysController.deteleCategory)

export default router