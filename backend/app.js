import express from "express";
import studentsRoutes from "./routes/students.js"
import registerStudentsRoutes from "./routes/registerStudents.js"
import loginStudentsRoutes from "./routes/loginStudent.js"
import logoutStudentsRoutes from "./routes/logoutStudent.js"
import recoveryPasswordStudentRoutes from "./routes/recoveryPasswordStudent.js";
import subjectsRoutes from "./routes/subjects.js"
import homeworksRoutes from "./routes/homeworks.js"
import subjectCategorysRoutes from "./routes/subjectCategorys.js";

import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

app.use(cors ({
    origin: ["https://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/students", studentsRoutes)
app.use("/api/registerStudent", registerStudentsRoutes)
app.use("/api/subjects", subjectsRoutes)
app.use("/api/homeworks", homeworksRoutes)
app.use("/api/categorys", subjectCategorysRoutes)
app.use("/api/loginStudent", loginStudentsRoutes)
app.use("/api/logoutStudent", logoutStudentsRoutes)
app.use("/api", recoveryPasswordStudentRoutes)

export default app