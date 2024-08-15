const { ObjectId } = require("mongodb");
const { validateBook } = require("../models/bookModel");

async function addBook(req, res, booksCollection) {
  try {
    const bookDetails = req.body;
    const { error } = validateBook(bookDetails);

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).send({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    const result = await booksCollection.insertOne(bookDetails);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
}

async function getAllBooks(req, res, booksCollection) {
  try {
    const result = await booksCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
}

async function getBookById(req, res, booksCollection) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await booksCollection.findOne(query);

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch the book",
      error: error.message,
    });
  }
}

async function updateBook(req, res, booksCollection) {
  try {
    const id = req.params.id;
    const bookDetails = req.body;
    const { error } = validateBook(bookDetails);

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).send({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedBookDetails = { $set: bookDetails };

    const result = await booksCollection.updateOne(filter, updatedBookDetails, options);

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "Book updated successfully", result });
    } else if (result.upsertedCount > 0) {
      res.send({
        success: true,
        message: "Book not found, but a new book was created",
        result,
      });
    } else {
      res.status(404).send({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update the book",
      error: error.message,
    });
  }
}

async function deleteBook(req, res, booksCollection) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await booksCollection.deleteOne(query);

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "Book deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete the book",
      error: error.message,
    });
  }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
