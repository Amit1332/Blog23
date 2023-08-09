const mongoose = require('mongoose');

const databaseConn = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/fileupload').then(()=>{
        console.log('connection successful Database');
    }).catch((err)=>{
        console.log(err);
    });
};


module.exports =databaseConn;