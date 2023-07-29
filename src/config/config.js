const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');


dotenv.config({ path: path.join(__dirname, '../../sample.env') });
const envVarSchema = joi.object()
    .keys({
        NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
        PORT: joi.number().default(3000)
    })
    .unknown();


const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);


if (error) {
    throw new Error(`Config Validation Error ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT

};