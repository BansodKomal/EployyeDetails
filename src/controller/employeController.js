const employeeUser = require('../model/employeModel')
const constant = require("../constant.js")
const employeModel = require('../model/employeModel')
const cloudinary = require('cloudinary').v2

const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
  
  }
//   const isValidObjectId = function (ObjectId) {
//     return mongoose.Types.ObjectId.isValid(ObjectId)
//   }
  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
  }
  cloudinary.config({
    cloud_name: 'gloryautotech',
    api_key: '441781279526363',
    api_secret: 'jzUBbVg0iJ68TKd5m-jR2SwhAX4'
  });
  


   
const createEmploye = async function(req,res){
  
    let data = req.body
   
    
    cloudinary.uploader.upload(file.tempFilePath, (err,result)=>{
        console.log(result)
        let file = req.file.documents;
       const {name,address,phone,joiningDate,contract,documents,wfoWfh,assets,salary} = data

    let data1 = {
        name:name, 
        address:address,
        phone:phone,
        joiningDate:joiningDate,
        contract:contract,
        documents:result.url,
        wfoWfh:wfoWfh,
        assets:assets,
        salary:salary
    }
})

     const create = await employeModel.create(data1)

     return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.SIGNUP.SUCCESS, data: create})
    
    

}

//   if(!isValidRequestBody(data)){

//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.BODY, data: null })
// }
// if(!isValid(name)){
//    return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
// }
// if(!isValid(address)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  if(!isValid(phone)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  if(!isValid(joiningDate)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  if(!isValid(contract)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
// //  if(!isValid(document)){
// //     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
// //  }
//  if(!isValid(wfoWfh)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  if(!isValid(assets)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  if(!isValid(salary)){
//     return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
//  }
//  const create = await employeModel.create(data)

//  return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.SIGNUP.SUCCESS, data: create,uploadImage  })
// } 

// catch (error) {
//     return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: error.message })
// }

// }


module.exports ={createEmploye}