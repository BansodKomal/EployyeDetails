const constant = require("../constant.js")
const mongoose = require('mongoose')
const expenseModel = require('../model/expenseModel.js')

const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
  
  }
  const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }
  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
  }
const createExpense = async function (req, res) {
    const data = req.body
    const{category,amount,date, remark} = data

     createExpenseData = await expenseModel.create(data)
     return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.LEAVE.SUCCESS, data: createExpenseData })

}

const getExpenseData = async function (req, res){
    const expenseId= req.query.expenseId

   // console.log(data)
    // console.log(expenseId)
    if(expenseId){
        const expenseDetailsById = await expenseModel.findById(expenseId)
        if (expenseDetailsById) {
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.GET, data:expenseDetailsById})    
         }
    }
   

 
    const getAllExpenseData = await expenseModel.find()
    return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.GET, data: getAllExpenseData })
}

const updateExpenseData = async function(req,res){
    const expenseId = req.query.expenseId
   
    let body = req.body
    let updated = await expenseModel.findOneAndUpdate({_id:expenseId}, {$set :{body}}, { new: true })
    res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.UPDATE, data: updated });
}

const delteExpenseData= async function (req, res) {
    try {


        let  expenseId= req.query.expenseId
        console.log(expenseId)
        //let userId = req.params.userId

        if (!isValidObjectId(expenseId)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        let delteExpenseData= await expenseModel.findById(expenseId)
       // console.log(DelteLeave)

        if (!delteExpenseData) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }
        const findExpenseData = await expenseModel.deleteOne(delteExpenseData)
        if (findExpenseData) {
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.DELETE, data: delteExpenseData})

        }
}

    catch (err) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
    }

}






module.exports ={createExpense, getExpenseData, updateExpenseData, delteExpenseData}
