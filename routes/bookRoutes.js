const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

module.exports = (booksCollection) => {
  router.get("/books", (req, res) => getAllBooks(req, res, booksCollection));
  router.post("/books", (req, res) => addBook(req, res, booksCollection));
  router.get("/books/:id", (req, res) => getBookById(req, res, booksCollection));
  router.put("/books/:id", (req, res) => updateBook(req, res, booksCollection));
  router.delete("/books/:id", (req, res) => deleteBook(req, res, booksCollection));
  return router;
};
