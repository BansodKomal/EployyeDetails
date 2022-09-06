const constant = require("../constant.js")
const attendanceModel = require('../model/attendanceModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
var moment = require('moment')
const axios = require('axios').default;


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}



const createDetails = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    // try {
    let newCreateStatus = constant.httpCodes.NEWLYCREATED
    // const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
    // const attendanceBody = req.body
    // const { date, employee } = attendanceBody

    const axios = require('axios')
    const url = 'https://employee-deteils.herokuapp.com/getEmployee'
    console.log(url)

     const response = axios.get(url)
      console.log(response);


    axios.get(url)
        .then((response) => {
           // console.log(response)
        })
        .catch(function (error) {
            //console.log(error);
        })
    // let arr = []
    // for (const ele of employee) {
    //     let createDetails = {}

    //     createDetails.date = date
    //     createDetails.employeeId = ele.employeeId,
    //         createDetails.inTime = ele.inTime,
    //         createDetails.outTime = null
    //     arr.push(createDetails)

    // }

    //const createAttendaceDetails = await attendanceModel.create(arr)

    // return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: createAttendaceDetails })
}

//     catch (err) {
//         res.status(server).send({ status: false, message: err.message })
//     }
// }

const updateAttendance = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let updateAttendanceData = req.body
        let attendanceId = req.params.attendanceId
        // let date = req.params.date


        const { date, inTime, outTime } = updateAttendanceData


        if (!isValidObjectId(attendanceId)) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        }
        const AteendanceByEmployeeId = await attendanceModel.findById(attendanceId)
        if (!AteendanceByEmployeeId) {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }

        let updateAttendance = await attendanceModel.updateOne(AteendanceByEmployeeId, updateAttendanceData, { new: true })

        console.log(updateAttendance)

        res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.UPDATE, data: AteendanceByEmployeeId })

    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}

const getAttendaceByDate = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {

        const success = constant.httpCodes.HTTP_SUCCESS
        let date = req.query.date
        let attendanceObj = {}
        if (date) {
            attendanceObj.date = date
        }

        let attendance = await attendanceModel.find(attendanceObj)

        return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.GET, count: attendance.length, data: attendance })
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}

///////////////////////////////////////////////////////////////////////////////////////////

const deleteAttendanceById = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

        let date = req.params.date

        const findAttendanceId = await attendanceModel.deleteMany({ date: date })
        if (findAttendanceId) {
            return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.DELETE, data: findAttendanceId })

        }
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}

module.exports = { createDetails, updateAttendance, getAttendaceByDate, deleteAttendanceById }

































        //     if (!isValidObjectId(attendanceId)) {
        //         return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        //     }
        //   //  let delteAttendanceId = await attendanceModel.findById(attendanceId)
        // console.log(delteAttendanceId);
        // if (!delteAttendanceId) {
        //     return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        // }