const constant = require("../constant.js")
const attendanceModel = require('../model/attendanceModel')
const employeModel = require('../model/employeModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
var moment = require('moment')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

function validateDate(testdate) {
   // var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
   var date_regex = /^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/
    return date_regex.test(testdate);
}

const createDetails = async function getEmployee(req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const success = constant.httpCodes.HTTP_SUCCESS
        const attendanceBody = req.body
        const { date, inTime, outTime, name } = attendanceBody

      
        let employee = await employeModel.find()

        
        const attendanceRecord = await attendanceModel.find({ "date": date })
        if (attendanceRecord.length == 0) {
            let arr = []
            for (var a of employee) {
                let obj = {}
                obj.date = date
                obj.employeeId = a._id
                obj.name = a.name
                obj.inTime = null
                obj.outTime = null
                arr.push(obj)
            }
            const newAttendance = await attendanceModel.create(arr)
            return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: newAttendance })
        }
        else {
            console.log("sdfg");
            for (var a of employee) {
                var data = []
                let attendanceData = await attendanceModel.find({ "date": date, "employeeId": a._id })
                console.log(attendanceData.length)
                if (!attendanceData.length) {
                    data.push({
                        date: date,
                        employeeId: a._id,
                        name: a.name,
                        inTime: null,
                        outTime: null
                    })
                    let attendance = await attendanceModel.create(data)
                    return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendance , attendanceRecord})
                }
                    }
                   
            }
            
 
        let   attendancek = await attendanceModel.create(data)
                     
        return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendancek})
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
        for (let empl of employee) {
            let employeeId = empl.employeeId
            let inTime = empl.inTime
            let outTime = empl.outTime
            console.log(arr)

            let updateAttendance = await attendanceModel.updateMany({ employeeId: employeeId }, { $set: { inTime: inTime, outTime: outTime } }, { new: true })
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
        let attendanceId = req.query.attendanceId

         const findAttendanceId = await attendanceModel.deleteMany({ date: date })
        if (findAttendanceId) {
            return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.DELETE, data: findAttendanceId })

        }

        // let attendanceData = await attendanceModel.findOneAndDelete({ "_id": attendanceId })
        // if (attendanceData) {
        //     return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.DELETE, data: attendanceData })

        // } 
        else {
            return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
        }

    }

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}






const newCreateDetails = async function getEmployee(req, res) {
    const server = constant.httpCodes.HTTP_SERVER_ERROR

    try {
        let newCreateStatus = constant.httpCodes.NEWLYCREATED
        const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
        const success = constant.httpCodes.HTTP_SUCCESS
        const attendanceBody = req.body
        const { date, inTime, outTime, name } = attendanceBody
        let employee = await employeModel.find()
        const attendanceRecord = await attendanceModel.find({ "date": date })
        if (attendanceRecord.length == 0) {
            let arr = []
            for (var a of employee) {
                let obj = {}
                obj.date = date
                obj.employeeId = a._id
                obj.name = a.name
                obj.inTime = null
                obj.outTime = null
                arr.push(obj)
            }
            const newAttendance = await attendanceModel.create(arr)
            return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: newAttendance })
        }
        else {
            console.log("sdfg");
            for (var a of employee) {
                var data = []
                let attendanceData = await attendanceModel.find({ "date": date, "employeeId": a._id })
               for(var b of  attendanceRecord){
                console.log(a._id)
                console.log((b.employeeId))
               // console.log(b.employeeId)
                if (!b.employeeId) {
                    data.push({
                        date: date,
                        employeeId: b.employeeId,
                        name: a.name,
                        inTime: null,
                        outTime: null
                   
                    })

                    // let attendance = await attendanceModel.create(data)
                    // return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendance, attendanceRecord })
                }
                // else{
                //     return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceRecord})
                // }
            }
        }

        }
            
 
        let   attendancek = await attendanceModel.create(data)
                     
        return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendancek,  attendanceRecord})
    }
    

    catch (err) {
        res.status(server).send({ status: false, message: err.message })
    }

}

























module.exports = { createDetails, updateAttendance, getAttendaceByDate, deleteAttendanceById, newCreateDetails }



 // const findAttendanceId = await attendanceModel.deleteMany({ date: date })
        // if (findAttendanceId) {
        //     return res.status(success).send({ status: true, message: constant.messages.ATTENDANCE.DELETE, data: findAttendanceId })

        // }






//////////////////////////////////////////////////////////////////////////////////////
   
                // const isAttendace = attendanceData.filter(ele => ele.employeeId = a._id)
                // console.log(isAttendace)


                // if (!attendanceData.length) {
                //     data.push({
                //         date: date,
                //         employeeId: a._id,
                //         name: a.name,
                //         inTime: null,
                //         outTime: null
                //     })
                //     const newAttendance = await attendanceModel.create(data)
                //     return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: newAttendance, attendanceRecord })
                // }
                // else {
                //     return res.status(newCreateStatus).send({ status: true, message: constant.messages.ATTENDANCE.SUCCESS, data: attendanceRecord })
                // }










