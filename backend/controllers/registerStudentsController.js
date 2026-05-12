import studentsModel from "../models/students.js";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../config.js"
import nodemailer from "nodemailer"

const registerStudentsController = {}

registerStudentsController.register = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        const existingStudent = await studentsModel.findOne({email})

        if (existingStudent) {
            return res.status(400).json({message: "Student already exists"})
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthdate,
            phone,
            grade
        }, config.JWT.secret,
           {expiresIn: "15m"}
        )

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailoptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: `Para verificar la cuenta ingresa el código ${randomCode}, expira en 15 minutos`
        }

        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                return res.status(500).json({message: "Error sending email"})
            }
        })

        return res.status(200).json({message: "Email sent"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

registerStudentsController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {
            randomCode: storedCode,
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified,
            loginAttempts,
            timeOut
        } = decoded

        console.log(verificationCodeRequest + " : " + storedCode)

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({message: "Invalid code"})
        }

        const newStudent = new studentsModel({
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified: true
        })

        await newStudent.save()

        return res.status(200).json({message: "Student registered"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerStudentsController