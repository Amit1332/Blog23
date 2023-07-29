const app = require('./app');
const config = require('./config/config');




 
let server = app.listen(config.port ,()=>{
    console.log(`connection  on port ${config.port}`);
    console.log(`Website is under ${config.env}`);
});