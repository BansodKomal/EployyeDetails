const constant = require("../constant.js")
const leaveModel = require('../model/leaveModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')


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

const createLeave = async function (req, res) {
    let data = req.body
    employeId = req.params.employeId

    if (!isValidObjectId(employeId)) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }
    let check = await employeModel.findById(employeId)

    if (!check) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }
    const { name, fromDate, toDate, remark } = data
    const leaveData = await leaveModel.create(data)
    return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.LEAVE.SUCCESS, data: leaveData })

}


const getLeave = async function (req, res) {
    const employeId = req.params.employeId

    let params = req.query
    const { id, fromDate, toDate } = params
    const leaveId = params.id;
    if (!isValidObjectId(employeId)) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }
    const findObj ={};
    if (id) {
        findObj._id = id;        
    }
    let findLeaveData = await leaveModel.find()
    return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.GET, data: findLeaveData })
}

const updateleave = async function (req, res) {


    let leaveId = req.query.leaveId

    let body = req.body
   

    if (!isValidObjectId(leaveId)) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }
    let check = await leaveModel.findById(leaveId)

    if (!check) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }
    



    let updated = await leaveModel.findOneAndUpdate({_id: leaveId}, {$set :{body}}, { new: true })
    res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.UPDATE, data: updated });

}

const deleteLeaveById = async function (req, res) {
    try {


        let leaveId = req.query.leaveId
        console.log(leaveId)
        //let userId = req.params.userId

        if (!isValidObjectId(leaveId)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        let DelteLeave = await leaveModel.findById(leaveId)
       // console.log(DelteLeave)

        if (!DelteLeave) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }
        const findLeaveId = await leaveModel.deleteOne(DelteLeave)
        if (findLeaveId) {
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.DELETE, data: DelteLeave })

        }




    }

    catch (err) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
    }

}




module.exports = { createLeave, getLeave, updateleave, deleteLeaveById }