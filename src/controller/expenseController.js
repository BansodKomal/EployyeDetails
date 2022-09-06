const constant = require("../constant.js")
const mongoose = require('mongoose')
const expenseModel = require('../model/expenseModel.js')
var moment = require('moment')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createExpense = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const createExpenseDetail = req.body
        const { category, amount, date, remark } = createExpenseDetail
        let attendanceDate = moment(date, 'DD/MM/YYYY', true).format()
        if (!/((\d{4}))/.test(date)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.DATE, data: null })
        }
        if (!isValidRequestBody(createExpenseDetail)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
        }
        let createExpenseData = await expenseModel.create(createExpenseDetail)
        return res.status(newCreateStatus).send({ status: true, message: constant.messages.EXPENSE.SUCCESS, data: createExpenseData })

    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }
}

const getExpenseData = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const expenseId = req.query.expenseId
        let expenseIdDetails = {}
        if (expenseId) expenseIdDetails._id = expenseId
        const getAllExpenseData = await expenseModel.find(expenseIdDetails)
        return res.status(success).send({ status: true, message: constant.messages.EXPENSE.GET, data: getAllExpenseData })
    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }
}

const updateExpenseData = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const success = constant.httpCodes.HTTP_SUCCESS
        const expenseId = req.query.expenseId
        let updateExpenseBody = req.body
        if (!isValidRequestBody(updateExpenseBody)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
        }
        if (!isValidObjectId(expenseId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        let findExpenseId = await expenseModel.findById(expenseId)
        if (!findExpenseId) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }

        let updated = await expenseModel.updateOne({ _id: expenseId }, updateExpenseBody, { new: true })
        res.status(success).send({ status: true, message: constant.messages.EXPENSE.UPDATE, data: findExpenseId })
    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }



}

const delteExpenseData = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {

        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let expenseId = req.params.expenseId

        if (!isValidObjectId(expenseId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
       
        const findExpenseData = await expenseModel.findOneAndDelete({ '_id': expenseId  })
        if (findExpenseData) {
            return res.status(success).send({ status: true, message: constant.messages.EXPENSE.DELETE, data: findExpenseData})

        }else 
        return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}






module.exports = { createExpense, getExpenseData, updateExpenseData, delteExpenseData }
