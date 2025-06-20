import express from "express";
import { Book } from "../models/book.model";

export const booksRoute = express.Router();

booksRoute.post("/books", async (req, res) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
