require("dotenv").config()
const express = require('express');
var bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose')
const multer = require('multer')
const fileUpload = require("express-fileupload")
const cors = require('cors')


const app = express();


//app.use(multer().any())

// app.use(fileUpload());
// app.use(express.static("uploads"));
//app.use("/api/v1/students", students);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(fileUpload({
    useTempFiles: true
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(cors())
mongoose.connect(process.env.db, { useNewUrlParser: true })
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log(`the express is run on ` + (process.env.PORT || 3000))
})