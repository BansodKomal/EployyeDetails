
const cloudinary = require('cloudinary').v2
const constant = require("../constant.js")



cloudinary.config({
  cloud_name: 'gloryautotech',
  api_key: '441781279526363',
  api_secret: 'jzUBbVg0iJ68TKd5m-jR2SwhAX4'
});

const upload = async function (req, res) {
  const badRequest = constant.httpCodes.HTTP_BAD_REQUEST

  const file = req?.files?.documents
  if (req?.files?.documents) {
    let newCreateStatus = constant.httpCodes.NEWLYCREATED
    let file = req.files.documents
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result)
      return res.status(newCreateStatus).send({ status: true, message: constant.messages.EMPLOYE.S_DOCUMENT, data: result.url, publicId: result.public_id })
    })
  }
  else {
    return res.status(badRequest).send({ status: false, message: constant.messages.EMPLOYE.F_DOCUMENT, data: null })
  }
}
module.exports = { upload }