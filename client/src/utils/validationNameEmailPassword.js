//@ts-check
/**@module 
 * @requires hapi/joi
*/
const Joi = require('@hapi/joi');


// nameValidation 
/**@namespace Validation */
// const validation = data => {
//     switch (data.type) {
//         case "name": {
//             const schema = Joi.object({
//                 name: Joi.string().min(8).required().trim()
//             });
//             return schema.validate({ name: data.name });
//         }
//         case "email": {
//             const schema = Joi.object({
//                 email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "*"] } }).min(8).required().trim()
//             });
//             return schema.validate({ [data.type]: data[data.type] });
//         }
//         case "password": {
//             const schema = Joi.object({
//                 password: Joi.string().min(8).required().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//             });
//             return schema.validate({ password: data.password });
//         }
//         default: return { error: `unrecognized key ${data.type}` };
//     }

// }

// nameValidation 
/**@namespace nameValidation */
const nameValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(8).required().trim()

    });
    return schema.validate(data);
}

/**@namespace emaileValidation */
// emailValidation   THIS ONLY ACCEPTS .com and .net EXTENSIONS NEED TO FIND SOLUTION AND FIX validation.js on Server side
const emailValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "*"] } }).min(8).required().trim()

    });
    return schema.validate(data);
}


// passwordValidation    this extension did not work  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
// .pattern testing .pattern('^[a-zA-Z0-9]{3,30}$')
/**@namespace passwordValidation */
const passwordValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(8).required().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    });
    return schema.validate(data);
}

module.exports.nameValidation = nameValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
// module.exports.validation = validation;

