
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'gloryautotech',
    api_key: '441781279526363',
    api_secret: 'jzUBbVg0iJ68TKd5m-jR2SwhAX4'
  });

const upload = () => {
    let file = req.files.documents
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
 console.log(result)
  })
}
module.exports={upload}