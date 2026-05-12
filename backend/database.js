import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Api_evaluado")

const connection = mongoose.connection

connection.once("open", () => {
    console.log("DB is connected")
})

connection.on("disconected", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) => {
    console.log("error found " + error)
})