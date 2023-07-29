const express  = require('express');
const helmet = require('helmet');
const compression  = require('compression');
const cors = require('cors');
const fileupload = require('express-fileupload');
const xss = require('xss-clean');
const { config } = require('dotenv');
const morgan = require('./utils/morgan');


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
app.use(fileupload({
    parseNested:true,
    limits: { fileSize: 50 * 1024 *1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


module.exports =app;