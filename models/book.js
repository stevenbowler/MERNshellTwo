//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace bookSchema */
const bookSchema = new Schema({
  /**@name name*/
  title: { type: String, required: true },
  /**@name author*/
  author: { type: String, required: true },
  /**@name username*/
  username: { type: String, required: true },
  /**@name synopsis*/
  synopsis: String,
  /**@name date*/
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book; 
