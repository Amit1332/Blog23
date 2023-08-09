const express  = require('express');
const helmet = require('helmet');
const compression  = require('compression');
const cors = require('cors');
// const fileupload = require('express-fileupload');
const xss = require('xss-clean');
const { config } = require('dotenv');
const morgan = require('./utils/morgan');
const multer = require('multer');
const bookSchema = require('./models/bookSchema');
const path =require('path');
const app = express();

if(config.env !== 'test'){
    app.use(morgan.succesHandler);
    app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


//to enable cors
app.use(cors());
app.options('*',cors());

//gzip compression
app.use(compression());


// sanitize request data || xss attack
app.use(xss());
// app.use(fileupload({
//     parseNested:true,
//     limits: { fileSize: 50 * 1024 *1024 },
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));


const Storage =multer.diskStorage({
    destination:'./images',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    }
});

const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb('Error: You can Only Upload Images!!');
    }
};
const upload = multer({
    storage:Storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});


app.post('/upload', upload.single('testImage'), (req,res)=>{
    if(!req.file){
        console.log('No Exist');
    }
    else{
        const newImage = new bookSchema({
            name:req.body.name,
            image:{
                data:req.file.filename,
                contentType:'image/png'
            }
        });
        newImage.save().then(()=> res.send('successful upload image')).catch((err)=>console.log(err));
    }
});

app.post('/multiple', upload.array('images', 5), (req, res) => {
    if (req.files) {
        const imageColl = new bookSchema({
            name:req.body.name,
            images:[
                {
                    data:req.files,
                    contentType:'image/png'
                }
            ]
                
        });
        imageColl.save().then(()=> res.send('successful upload image')).catch((err)=>console.log(err));
    } else {
        res.status(400).send('Please upload a valid images');
    }
});
module.exports =app;