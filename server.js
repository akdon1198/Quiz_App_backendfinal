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
mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("database connected");})
.catch(() => {console.log("database not connected");})

app.use("/api/auth", authRoute)
app.use("/api/quiz", quizRoute)

app.listen(process.env.PORT, () => {
    console.log("server running at 5000");
})