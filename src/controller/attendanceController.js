const constant = require("../constant.js")
const attendanceModel = require('../model/attendanceModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
var moment = require('moment')
const { parseTwoDigitYear } = require("moment")
const axios = require('axios').default;


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

function validateDate(testdate) {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return date_regex.test(testdate);
}

const createDetails = async function getEmployee(req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const success = constant.httpCodes.HTTP_SUCCESS
        const attendanceBody = req.body
        const { date, inTime, outTime } = attendanceBody

        // if (!validateDate(date)) {
        //     return res.status(badRequest).send({ status: false, message: constant.messages.ATTENDANCE.DATE, data: null })
        // }
        let employee = await employeModel.find()
        let attendanceData = await attendanceModel.find({ "date": date })
        let data = []


        for (var a of employee) {
            let attendanceData = await attendanceModel.find({ "date": date, "employeeId": a._id })

            if (attendanceData.length) {
                let obj = {}
                console.log("klhjhg")
                obj.date = date,
                    obj.employeeId = a._id,
                    obj.inTime = null,
                    obj.outTime = null
                data.push(obj)
               
            } else {

                data.push({
                    date: date,
                    employeeId: a._id,
                    inTime: null,
                    outTime: null
                    

                })
                console.log("oiujyf")
               // const newAttendance = await attendanceModel.create(data)
               // return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceData })
                
            }

        }

    
    

    //     let arr = []

    //         for (empl of employee) {
    //  console.log("hjggdfg")
    //           let createDetails = {}

    //                 createDetails.date = date
    //                 createDetails.employeeId = empl._id,
    //                     createDetails.inTime = empl.inTime,
    //                     createDetails.outTime = empl.outTime
    //                 arr.push(createDetails)



    //         const createAttendaceDetails = await attendanceModel.create(arr)
    //         }



    //         return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: arr})


    //  return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: createAttendaceDetails })

    // console.log(a._id);

    //         const isAttendace = attendanceData.filter(ele => ele.employeeId = a._id)
    //         console.log(isAttendace.length);
    //         if (isAttendace && isAttendace.length) {
    //             data.push(isAttendace[0])
    //         }
    //         else {
    //             console.log("in else");
    //             data.push({
    //                 date: date,
    //                 employeeId: a._id,
    //                 inTime: null,
    //                 outTime: null
    //             })
    //             const newAttendance = await attendanceModel.create(data)
    //         }
    //         return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceData })
    //     }

    const newAttendance = await attendanceModel.create(data)
    return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceData })

}
    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}


/////////////////////////////////////////////////////////////

const updateAttendance = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const success = constant.httpCodes.HTTP_SUCCESS
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        let updateAttendanceData = req.body
        let date = req.query.date
        const { employee } = updateAttendanceData

        let arr = []
        for (const empl in employee) {

            var data = employee[empl]
            arr.push(data)

            let updateAttendance = await attendanceModel.updateMany({ employeeId: data.employeeId }, { $set: data }, { new: true })
        }
        return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.UPDATE, data: updateAttendanceData })
    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }
}
const getAttendaceByDate = async function (req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const success = constant.httpCodes.HTTP_SUCCESS
        let date = req.query.date
        let presentEmployee = req.query.presentEmployee
        let absentEMployee = req.query.absentEMployee

        let attendanceObj = {}
        if (date) {
            attendanceObj.date = date
        }
        let attendance1 = await attendanceModel.find(attendanceObj)

        if (attendance1) {

            absentEMployee = await attendanceModel.find({ $and: [{ date: date }, { inTime: null }, { outTime: null }] }).count()

            presentEmployee = attendance1.length - absentEMployee
            console.log(presentEmployee)

        }
        return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.GETDATA, totalEmployee: attendance1.length, presentEmployee: presentEmployee, absentEMployee: absentEMployee, data: attendance1 })
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
        let date = req.query.date


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




















        //     let arr = []
        //     if(attendanceData.length==0){
        //     for (empl of employee) {

        //         const obj = {}

        //         obj.employeId = empl._id

        //         {
        //             let createDetails = {}

        //             createDetails.date = date
        //             createDetails.employeeId = empl._id,
        //                 createDetails.inTime = empl.inTime,
        //                 createDetails.outTime = empl.outTime
        //             arr.push(createDetails)

        //         }
        //     }

        //     const createAttendaceDetails = await attendanceModel.create(arr)


        //     return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: createAttendaceDetails })


        // }







// const newOne = async function(req,res){
//     let date = req.query.date
//     let attendanceData = await attendanceModel.find({ "date": date })
//     let employee = await employeModel.find()
//     let data = []

//     for (var a of employee) {
//         const isAttendace = attendanceData.filter(ele => ele.employeeId = a._id)
//         console.log(isAttendace)
//         if (isAttendace && isAttendace.length) {
//       data.push(isAttendace[0])


//         }
//         else {
//             data.push({
//                 date: date,
//                 employeeId: a._id,
//                 inTime: null,
//                 outTime: null
//             })
//         }

//     }

// const get = await attendanceModel.create(data)
// res.send({data:get})
// }



















//     if (!isValidObjectId(attendanceId)) {
        //         return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
        //     }
        //   //  let delteAttendanceId = await attendanceModel.findById(attendanceId)
        // console.log(delteAttendanceId);
        // if (!delteAttendanceId) {
        //     return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        // }
         // obj.inTime = empl.inTime
            // obj.outTime= empl.outTime
          //  console.log(a.employeeId)
         // console.log(employee[empl])
         // console.log(obj)

