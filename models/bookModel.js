const Joi = require("joi");

const bookSchema = Joi.object({
  bookName: Joi.string().required().messages({
    "string.empty": "Book name is required.",
  }),
  author: Joi.string().required().messages({
    "string.empty": "Author is required.",
  }),
  id: Joi.string().required().messages({
    "string.empty": "ID is required.",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number.",
    "number.integer": "Quantity must be an integer.",
    "number.min": "Quantity must be at least 1.",
  }),
});

function validateBook(book) {
  return bookSchema.validate(book, { abortEarly: false });
}

module.exports = { validateBook };
