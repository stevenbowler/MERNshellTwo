//@ts-check
/**@module */
const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const verify = require('../../privateRoutesAuth');


// Matches with "/api/books"

/**
 * Register a new user
 * @function
 * @name route/
 * @memberof module:routes/api/books
 * @param {string} path - /
 * @returns {object}
 */
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"

/**
 * Register a new user
 * @function
 * @name route/:id
 * @memberof module:routes/api/books
 * @param {string} path - /:id
 * @returns {object}
 */
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
