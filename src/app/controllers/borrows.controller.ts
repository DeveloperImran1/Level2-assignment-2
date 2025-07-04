import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    console.log(body);

    const bookData = await Book.findById(body?.book);
    console.log("bookData", bookData);

    // checking is book available
    if (!bookData) {
      res.status(404).json({
        success: false,
        message: `This book is not found`,
        data: null,
      });
    }

    let data;

    // checking book availability and copies
    if (bookData?.available) {
      if (bookData?.copies >= body?.quantity) {
        data = await Borrow.create(body);
      } else {
        res.status(401).json({
          success: false,
          message: `Only ${bookData?.copies} book is available`,
          data: null,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Book is not available",
        data: null,
      });
    }

    // Deduct quantity and if no copie left, mark in unavailable (static method er maddhome hoia asbe)
    const updatededBook = await Borrow.updateAvailability(body, bookData);

    // save updated book
    await updatededBook.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },

      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $project: {
          totalQuantity: 1,
          "book.title": 1,
          "book.isbn": 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
