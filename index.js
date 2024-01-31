const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const authRoute = require("./routes/authRoute")
const quizRoute = require("./routes/quizRoute")
const cors = require("cors")
app.use(cors())
dotenv.config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://akash:akash@cluster0.o8cde90.mongodb.net/Quizdatabase?retryWrites=true&w=majority")
.then(() => {console.log("database connected");})
.catch(() => {console.log("database not connected");})

app.use("/api/auth", authRoute)
app.use("/api/quiz", quizRoute)

app.listen(5000, () => {
    console.log("server running at 5000");
})

// 123@guptaA