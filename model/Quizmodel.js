const mongoose = require("mongoose")

const Quizmodel = new mongoose.Schema({
    quizname : {type : String, required : true},
    quiztype : {type : String, required : true},
    questionarr : {type : Array, required : true},
    impression : {type : Number, required : true},
    created_on : {type : String, required : true},
    pollarr : {type : Array, required : true},
    userid : {type : String, required: true},
    timer : {type : Number, required : true}
})

module.exports = mongoose.model("Quiz", Quizmodel)
