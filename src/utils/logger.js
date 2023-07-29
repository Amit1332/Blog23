const winston  = require('winston')
const config = require('../config/config')

const enumerateErrorFormat = winston.format((info)=>{
if(info instanceof Error){
    Object.assign(info,{message:info.stack})
}
return info
})
