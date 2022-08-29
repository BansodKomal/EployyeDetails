const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary');
const employeeUser = require('../model/employeModel');
const employeModel = require('../model/employeModel');

module.exports=cloudinary.config({
  cloud_name: 'gloryautotech',
  api_key: '441781279526363',
  api_secret: 'jzUBbVg0iJ68TKd5m-jR2SwhAX4'
});


// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter:(req,file, cb)=>{
//     let ext = path.example(file.originalname);
//     if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
//       cb(new Error("File type is not supported"), false)
//       return; 
//     }
//     cb(null, true);
//   }
// })

// const create = async (req, res) => {
//  // try {
//     //const student = await employeModel.findById(req.params.id);

//     // if (!student) {
//     //   return res.status(404).json({ message: "Resource not found" });
//     // }
//     const profile = req.files.documents;
//     // Validate Image
//     const fileSize = profile.size / 1000;
//     const fileExt = profile.name.split(".")[1];
//     if (fileSize > 500) {
//       return res
//         .status(400)
//         .json({ message: "file size must be lower than 500kb" });
//     }

//     if (!["jpg", "png"].includes(fileExt)) {
//       return res
//         .status(400)
//         .json({ message: "file extension must be jpg or png" });
//     }

//     const fileName = `${req.body}${path.extname(profile.name)}`;
//     profile.mv(`uploads/${fileName}`, async (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send(err);
//       }
//       // update student profile field
//      await employeModel.create(req.body);
//       res.status(200).json({
//         data: {
//           file: `${req.protocol}://${req.get("host")}/${fileName}`,
//         },
//       });
//     });
//   // } catch (error) {
//   //   console.log(error);
//   // //   res.status(500).json({ message: "Internal Server Error" });
//   // }
// };
  

// module.exports = upload.single("documents"), async(req,res)=>{

// try{

//     let data = req.body
//     const {name,address,phone,joiningDate,contract,documents,wfoWfh,assets,salary} = data
// const result = await cloudinary.uploader.upload(req.file.path);

//     let employee= new Employee ({

//         name:name, 
//         address:address,
//         phone:phone,
//         joiningDate:joiningDate,
//         contract:contract,
//         documents:result.url,
//         wfoWfh:wfoWfh,
//         assets:assets,
//         salary:salary
    
// })
// let body= await employeModel.create(employee)
// return res.status(201).send({status:true, message:"sucessfully created", data:body})

    
    

// }
// catch (error) {
//   return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: error.message })
// }

// }
// module.exports ={create}