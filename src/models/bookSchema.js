const mongoose  = require('mongoose');


const imageSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        data:Buffer,
        contentType:String
    }
});

module.exports = new mongoose.model('image',imageSchema);