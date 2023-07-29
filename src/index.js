const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');



 
let server = app.listen(config.port ,()=>{
    logger.info(`Listening to port ${config.port}`);
    logger.debug(`Website is under ${config.env}`);
});

const exitHandler = ()=>{
    if(server){
        server.close(()=>{
            logger.info('server closed');
            process.exit(1);
        });
        
    }
    else{
        process.exit(1);
    }
};

const unExpectedErrorHandler = (error)=>{
    logger.error(error);
    exitHandler();

};

process.on('uncaughtException',unExpectedErrorHandler);
process.on('unhandledRejection',unExpectedErrorHandler);
