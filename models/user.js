//@ts-check
/**@module
 * @requires mongoose
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


/**@namespace
 * @property {String} name
 */
//@ts-ignore
const UserSchema = new Schema({
    /**@name name*/
    name: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    /**@name email*/
    email: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    /**@name password*/
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    /**@name date*/
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;