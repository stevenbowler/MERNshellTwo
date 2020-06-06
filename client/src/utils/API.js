//@ts-check
/**@module */
import axios from "axios";

export default {

  /**
   * Gets all books
   * @function getBooks 
   * @param {*} username
   * */
  getBooks: function (username) {
    return axios.get("/api/books/?=" + username);
  },

  /**
   * Gets the book with the given id
   * @function getBook
   * @param {*} id*/
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },

  /**
   * Deletes the book with the given id
   * @function deleteBook
   * @param {*} id 
   */
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },

  /**
   * Saves a book to the database
   * @function saveBook
   * @param {*} bookData 
   */
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
