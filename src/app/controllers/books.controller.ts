import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query.filter ? { genre: req.query.filter } : {};
    const sortBy = req.query.sortBy as string;
    const sort = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const books = await Book.find(filter)
      .sort({ [sortBy]: sort })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getSingleBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;

    const books = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateSingleBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    console.log(body);
    const book = await Book.findById(bookId);
    // const updatedDoc = {
    //   _id: book?._id,
    //   title: body?.title || book?.title,
    //   author: body?.author || book?.author,
    //   genre: body?.genre || book?.genre,
    //   isbn: body?.isbn || book?.isbn,
    //   description: body?.description || book?.description,
    //   copies: body?.copies || book?.copies,
    //   available: body?.available || book?.available,
    //   createdAt: body?.createdAt,
    //   updatedAt: body?.updatedAt,
    // };

    const updatedDoc = { ...book?.toObject(), ...body };
    const data = await Book.findOneAndUpdate({ _id: bookId }, updatedDoc, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Books updated  successfully",
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteSingleBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findOneAndDelete({ _id: bookId });

    if (data) {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book not found",
        data: null,
      });
    }
  } catch (error: any) {
    next(error);
  }
};
