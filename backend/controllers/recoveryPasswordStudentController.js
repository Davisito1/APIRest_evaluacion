import studentsModel from "../models/students.js"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"
import nodemailer from "nodemailer"
import { decode } from "punycode"
import { model } from "mongoose"

const recoveryPasswordStudentController = {}

recoveryPasswordStudentController.requestCode = async (req, res) => {
    try {
        const {email} = req.body

        const studentFound = await studentsModel.findOne({email})

        if (!studentFound) {
            return res.status(400).json({message: "Student not found"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign(
            {email, randomCode, UserType: "student", verified: false},
            config.JWT.secret, 
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})

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
            text: `Para cambiar tu contraseña ingresa el código ${randomCode}, expira en 15 minutos`
        }

        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                return res.status(500).json({message: "Error sending email"})
            }
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

recoveryPasswordStudentController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body

        const token = req.cookies.RecoveryCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (code !== decoded.randomCode) {
            return res.status(400).json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, UserType: "student", verified: true},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})

        return res.status(200).json({message: "Code verified"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

recoveryPasswordStudentController.newPassword = async (req, res) => {
    try {
        const {newPassword, confirmPassword} = req.body

        if (newPassword !== confirmPassword) {
            return res.status(400).json({message: "Password doesn't match"})
        }

        const token = req.cookies.RecoveryCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (!decoded.verified) {
            return res.status(400).json({message: "Code not verified"})
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await studentsModel.findOneAndUpdate({email: decoded.email}, {password: passwordHash}, {new: true})

        res.clearCookie("recoveryCookie")

        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default recoveryPasswordStudentController