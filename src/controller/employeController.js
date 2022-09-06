
const constant = require("../constant.js")
const employeModel = require('../model/employeModel')
const cloudinary = require('cloudinary').v2
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

cloudinary.config({
  cloud_name: 'gloryautotech',
  api_key: '441781279526363',
  api_secret: 'jzUBbVg0iJ68TKd5m-jR2SwhAX4'
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createEmploye = async function (req, res) {
  const server = constant.httpCodes.HTTP_SERVER_ERROR
  try {
    let newCreateStatus = constant.httpCodes.NEWLYCREATED
    const badRequest = constant.httpCodes.HTTP_BAD_REQUEST
    let employeeData = req.body

    const file = req?.files?.documents
    const { name, address, phone, joiningDate, contract, documents, wfoWfh, assets, salary, documentsId } = employeeData

    if (!(/^([+]\d{2})?\d{10}$/.test(phone)))
      return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPHONE, data: null })
    const alreadyExsit = await employeModel.findOne({ phone: phone })
    if (alreadyExsit) {
      return res.status(constant.httpCodes.HTTP_ALREADY_EXISTS).send({ status: false, message: constant.messages.SIGNUP.PHONE_ALREADY_USE, data: null })
    }
    let createEmployeeDetails = await employeModel.create(employeeData)

    return res.status(newCreateStatus).send({ status: true, message: constant.messages.EMPLOYE.SUCCESS, data: createEmployeeDetails })
  }


  catch (err) {
    res.status(server).send({ status: false, message: err.message })
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////

const getEmployeeById = async function (req, res) {
  const server = constant.httpCodes.HTTP_SERVER_ERROR
  try {
    const success = constant.httpCodes.HTTP_SUCCESS

    let query = req.query
    const { employeId, salary } = query
    const findObj = {};
    if (employeId) findObj._id = employeId;
    if (salary) findObj.salary = salary;
    const allEmployeData = await employeModel.find(findObj)

    return res.status(success).send({ status: true, message: constant.messages.EMPLOYE.GET, data: allEmployeData })

  }
  catch (err) {
    res.status(server).send({ status: false, message: err.message })

  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateEmployee = async function (req, res) {
  const server = constant.httpCodes.HTTP_SERVER_ERROR

  try {
    const success = constant.httpCodes.HTTP_SUCCESS
    const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

    let employeId = req.query.employeId
    let updateEmployeeBody = req.body

    if (!isValidRequestBody(updateEmployeeBody)) {
      return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.EMPTY, data: null })
    }
    const { name, address, phone, joiningDate, contract, documents, wfoWfh, assets, salary } = updateEmployeeBody
    if (!isValidObjectId(employeId)) {
      return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }
    let checkEmployeId = await employeModel.findById(employeId)

    if (!checkEmployeId) {
      return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }


    let updatedEmployeeDetails = await employeModel.updateOne({ _id: employeId }, updateEmployeeBody, { new: true })
    res.status(success).send({ status: true, message: constant.messages.EMPLOYE.UPDATE, data: checkEmployeId });
  }

  catch (err) {
    res.status(server).send({ status: false, message: err.message })
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteEmpleById = async function (req, res) {
  const server = constant.httpCodes.HTTP_SERVER_ERROR
  try {
    const success = constant.httpCodes.HTTP_SUCCESS
    const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

    let employeId = req.query.employeId


    if (!isValidObjectId(employeId)) {
      return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }

   
    // const deleteId = await cloudinary.uploader.destroy(delteEmployeesDetail.documentsId)
    const findEmployeId = await employeModel.findOneAndDelete({ '_id': employeId })
    if (findEmployeId) {
      return res.status(success).send({ status: true, message: constant.messages.EMPLOYE.DELETE, data: findEmployeId})

    }else 
    return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
}
  
  catch (err) {
    res.status(server).send({ status: false, message: err.message })
  }

}



module.exports = { createEmploye, getEmployeeById, updateEmployee, deleteEmpleById }