const morgan = require('morgan');
const logger = require('./logger');
const config = require('../config/config');

morgan.token('message',(req,res)=>res.locals.errorMessage || '');

const getIpFormat = ()=> config.env === 'production' ? ':remote-dir - ' : '' ;
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;


const succesHandler = morgan(successResponseFormat,{
    skip:(req,res)=> res.statusCode >=400,
    stream: {write: (message)=> logger.info(message.trim())}
});

const errorHandler = morgan(errorResponseFormat,{
    skip:(req,res)=> res.statusCode <400,
    stream: {write: (message)=> logger.error(message.trim())}
});

module.exports ={
    succesHandler,
    errorHandler,
};