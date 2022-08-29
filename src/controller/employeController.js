
const constant = require("../constant.js")
const employeModel = require('../model/employeModel')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const { createIndexes } = require("../model/employeModel")

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




const createEmploye = async function (req, res) {

  let data = req.body
  const { name, address, phone, joiningDate, contract, documents, wfoWfh, assets, salary } = data
  if(req?.files?.documents)
  {
    let file = req.files.documents
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result)  
      const { name, address, phone, joiningDate, contract, documents, wfoWfh, assets, salary } = data
      let data1 = {
        name: name,
        address: address,
        phone: phone,
        joiningDate: joiningDate,
        contract: contract,
        documents: result.url,
        wfoWfh: wfoWfh,
        assets: assets,
        salary: salary
      }
      let create = await employeModel.create(data1)
      return res.status(201).send({ status: true, message: "successfully created", data: create })
    })
  }
  else{
    //return res.status(201).send({ status: true, message: "document is required ", data: null })
    const { name, address, phone, joiningDate, contract, documents, wfoWfh, assets, salary } = data
      let data1 = {
        name: name,
        address: address,
        phone: phone,
        joiningDate: joiningDate,
        contract: contract,
        documents: "",
        wfoWfh: wfoWfh,
        assets: assets,
        salary: salary
      }
      let create = await employeModel.create(data1)
      return res.status(201).send({ status: true, message: "Saved withot document", data: create })
  }
}





const getEmployeeById = async function (req, res) {
  let params = req.query
  const { id, salary } = params

  const all = await employeModel.find()
  if (id || salary) {
    let id1 = await employeModel.findById(id)
    let title1 = await employeModel.find({ salary: salary })
    let data = (id1 || title1)
    return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.GET, data: data })
  }
  else {
    return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.GET, data: all })
  }

}
const updateEmployee = async function (req, res) {


  let employeId = req.query.employeId

  let body = req.files


  if (!isValidObjectId(employeId)) {
    return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
  }
  let check = await employeModel.findById(employeId)

  if (!check) {
    return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
  }



  let updated = await employeModel.findOneAndUpdate({ employeId: employeId }, body, { new: true })
  res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.UPDATE, data: updated });

}

const deleteEmpleById = async function (req, res) {
  try {


    let employeId = req.params.employeId
    console.log(employeId)
    //let userId = req.params.userId

    if (!isValidObjectId(employeId)) {
      return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.PARAM, data: null })
    }
    let DelteEmployeeDetails = await employeModel.findById(employeId)

    if (!DelteEmployeeDetails) {
      return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.EMPLOYE.ABCENTID, data: null })
    }
    const findemployeId = await employeModel.deleteOne(DelteEmployeeDetails)
    if (findemployeId) {
      return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.EMPLOYE.DELETE, data: DelteEmployeeDetails })

    }




  }

  catch (err) {
    res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
  }

}



module.exports = { createEmploye, getEmployeeById, updateEmployee, deleteEmpleById }