const Quizmodel = require("../model/Quizmodel")
const router = require("express").Router()

router.post("/addquiz", async (req, res) => {
    const {quizname, quiztype, questionarr, pollarr, userid, timer, date} = req.body
    try{
        const quiz = new Quizmodel({
            quizname,
            quiztype,
            questionarr,
            pollarr,
            userid,
            timer,
            impression : 0,
            created_on : date
        })
        const quizobj = await quiz.save()
        res.json({
            message : "quiz saved",
            quizobj
        })
    }catch(err){
        res.json({
            message : "quiz not saved"
        })
    }
})

router.get("/getquiz/:id", async (req, res) =>{
    const {id} = req.params
    try{
        const allquiz = await Quizmodel.find({userid : id}).sort({impression : -1})
        res.json({
            allquiz
        })
    }catch(err){
        res.json({
            message : "some error occured"
        })
    }
    
})

router.delete("/deletequiz/:id", async (req, res)=>{
    const {id} = req.params
    try{
        const deletedquiz = await Quizmodel.findByIdAndDelete(id)
        res.json({
            deletedquiz
        })
    }catch(err){
        res.json({
            message : "some error occured"
        })
    }
})

router.patch("/updatequiz/:id", async (req, res) =>{
    const {id} = req.params
    const {quizname, quiztype, questionarr, pollarr, userid, timer, created_on, impression} = req.body
    try{
        if(!impression){
            const updatedquiz = await Quizmodel.findByIdAndUpdate(id,
                {quizname, quiztype, questionarr, pollarr, userid, timer, created_on}
            )
            return res.json({
                updatedquiz
            })
        }
        const updatedquiz = await Quizmodel.findByIdAndUpdate(id,
            {quizname, quiztype, questionarr, pollarr, userid, timer, created_on, impression}
        )
        res.json({
            updatedquiz
        })
    }catch(err){
        res.json({
            message : "some error occured"
        })
    }
})

router.get("/getsinglequiz/:id", async (req, res)=>{
    const {id} = req.params
    try{
        const quiz = await Quizmodel.findById(id)
        res.json({
            quiz
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})
module.exports = router