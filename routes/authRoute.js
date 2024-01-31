const router = require("express").Router()
const Usermodel = require("../model/Usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
router.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await Usermodel.findOne({email})
    if(!user){
        return res.json({
            message : "Wrong Email or password"
        })
    }
    try{
        const hasmatch = await bcrypt.compare(password, user.password)
        if(hasmatch){
            const jwttoken = jwt.sign(user.toJSON(), "12@g", {expiresIn:180})
            res.json({  
                jwttoken,
                user
            })
        }else{
            res.json({
                message : "Wrong Email or password"
            })
        }
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

router.post("/register", async (req, res)=>{
    const {name, email, password} = req.body
    const alreadyuser = await Usermodel.findOne({email})
    if(alreadyuser){
        return res.json({
            message : "Email already present"
        })
    }
    try{
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new Usermodel({name, email, password : hashedpassword})
        const saveduser = await user.save()
        const jwttoken = jwt.sign(user.toJSON(), "12@g", {expiresIn: 10})
        res.json({
            jwttoken,
            user : saveduser
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports = router