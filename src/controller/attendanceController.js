const constant = require("../constant.js")
const attendanceModel = require('../model/attendanceModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
var moment = require('moment')

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createAttendaceDetails = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const attendanceBody = req.body
        const { date, employeeId, inTime, outTime } = attendanceBody
        if (!isValidRequestBody(attendanceBody)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
        }
        let attendanceDate = moment(date, 'DD/MM/YYYY', true).format()
        if (!/((\d{4}))/.test(date)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.DATE, data: null })
        }
        let attendanceTime = moment(req.body.inTime, "HH:mm", true).format('LT')
        if (!/((^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$))/.test(inTime)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.TIME, data: null })
        }

        const findEmployeId = await employeModel.findById(employeeId)
        let createDetails = {}
        createDetails.date = attendanceDate
        createDetails.employeeId = findEmployeId._id
        createDetails.inTime = attendanceTime

        const attendanceData = await attendanceModel.create(createDetails)
        return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceData })

    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }


}

const getAttendanceSheet = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR
    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let attendanceData = req.query
        const { employeeId, date } = attendanceData
        let attendanceObj = {}
        if (employeeId) {
            attendanceObj.employeeId = employeeId
        }
        if (date) {
            attendanceObj.date = date
        }
     
        const allEmployeData = await attendanceModel.find(attendanceObj)
        return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.GET, count: allEmployeData.length, data: allEmployeData })

    }
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }


}


const updateAttendance = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let updateAttendanceData = req.body
        let attendanceId = req.query.attendanceId
        console.log(attendanceId);
        const { date, employeeId, inTime, outTime } = updateAttendanceData
        if (!isValidObjectId(attendanceId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }

        if (!/((^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$))/.test(outTime)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.TIME, data: null })
        }

        const AteendanceByEmployeeId = await attendanceModel.findById(attendanceId)
        // console.log(AteendanceByEmployeeId)

        let updateAttendance = await attendanceModel.updateOne({ _id: attendanceId }, updateAttendanceData, { new: true })

        res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.UPDATE, data: AteendanceByEmployeeId })

    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}
const deleteAttendanceData = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {


        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

        let attendanceId = req.query.attendanceId

        if (!isValidObjectId(attendanceId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        let delteAttendanceId = await attendanceModel.findById(attendanceId)

        if (!delteAttendanceId) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }
        const findAttendanceId = await attendanceModel.deleteOne(delteAttendanceId)
        if (findAttendanceId) {
            return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.DELETE, data: delteAttendanceId })

        }
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}




module.exports = { createAttendaceDetails, getAttendanceSheet, updateAttendance, deleteAttendanceData }