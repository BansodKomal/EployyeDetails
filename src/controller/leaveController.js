const constant = require("../constant.js")
const leaveModel = require('../model/leaveModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')
var moment = require('moment')



const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createLeave = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

        let createLeaveData = req.body
        employeId = req.query.employeId
        const { name, fromDate, toDate, remark } = createLeaveData

        if (!isValidRequestBody(createLeaveData)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
        }

        if (!isValidObjectId(employeId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        if (!/((\d{4}))/.test(fromDate)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.DATE, data: null })
        }
        if (!/((\d{4}))/.test(toDate)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.DATE, data: null })
        }
        let checkEmployeId = await employeModel.findById(employeId)

        if (!checkEmployeId) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }

        const leaveData = await leaveModel.create(createLeaveData)
        return res.status(newCreateStatus).send({ status: true, message: constant.messages.LEAVE.SUCCESS, data: leaveData })

    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}

const getLeaveData = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        let leaveId = req.query.leaveId
        const findObj = {};
        if (leaveId)
            findObj._id = leaveId;

        let findLeaveData = await leaveModel.find(findObj)
        return res.status(success).send({ status: true, message: constant.messages.LEAVE.GET, data: findLeaveData })
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }


}

/////////////////////////////////////////////////////////////////////////////


const updateLeave = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let leaveId = req.query.leaveId

        let updateLeaveBody = req.body

        if (!isValidRequestBody(updateLeaveBody)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
        }
        if (!isValidObjectId(leaveId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        let checkLeaveId = await leaveModel.findById(leaveId)

        if (!checkLeaveId) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }
        let updated = await leaveModel.findOneAndUpdate({ _id: leaveId }, updateLeaveBody, { new: true })
        res.status(success).send({ status: true, message: constant.messages.LEAVE.UPDATE, data: checkLeaveId });

    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}


//////////////////////////////////////////////////////////////////////////////////////////////////

const deleteLeaveById = async function (req, res) {

    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

        let leaveId = req.query.leaveId

        if (!isValidObjectId(leaveId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        const delteLeaveDetail = await leaveModel.findOneAndDelete({ '_id': leaveId })
        if (delteLeaveDetail) {
            return res.status(success).send({ status: true, message: constant.messages.EMPLOYE.DELETE, data: delteLeaveDetail })

        } else
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}


module.exports = { createLeave, getLeaveData, updateLeave, deleteLeaveById }