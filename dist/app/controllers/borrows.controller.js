"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrow = exports.createBorrow = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        const bookData = yield book_model_1.Book.findById(body === null || body === void 0 ? void 0 : body.book);
        console.log("bookData", bookData);
        // checking is book available
        if (!bookData) {
            return res.status(404).json({
                success: false,
                message: `This book is not found`,
                data: null,
            });
        }
        let data;
        // checking book availability and copies
        if (bookData === null || bookData === void 0 ? void 0 : bookData.available) {
            if ((bookData === null || bookData === void 0 ? void 0 : bookData.copies) >= (body === null || body === void 0 ? void 0 : body.quantity)) {
                data = yield borrow_model_1.Borrow.create(body);
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: `Only ${bookData === null || bookData === void 0 ? void 0 : bookData.copies} book is available`,
                    data: null,
                });
            }
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Book is not available",
                data: null,
            });
        }
        // Deduct quantity and if no copie left, mark in unavailable (static method er maddhome hoia asbe)
        const updatededBook = yield borrow_model_1.Borrow.updateAvailability(body, bookData);
        // save updated book
        yield updatededBook.save();
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBorrow = createBorrow;
const getBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrow = getBorrow;
