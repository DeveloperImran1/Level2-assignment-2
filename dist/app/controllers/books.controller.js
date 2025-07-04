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
exports.deleteSingleBooks = exports.updateSingleBooks = exports.getSingleBooks = exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) == 11000) {
            return res.status(400).json({
                success: false,
                message: "This ISBN number is already exist!",
                error,
            });
        }
        next(error);
    }
});
exports.createBook = createBook;
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter ? { genre: req.query.filter } : {};
        // const sortBy = req.query.sortBy as string;
        // const sort = req.query.sort === "asc" ? 1 : -1;
        // const limit = parseInt(req.query.limit as string) || 10;
        const books = yield book_model_1.Book.find(filter).sort({ createdAt: -1 });
        // .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBooks = getBooks;
const getSingleBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBooks = getSingleBooks;
const updateSingleBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        const updatedDoc = Object.assign(Object.assign({}, book === null || book === void 0 ? void 0 : book.toObject()), body);
        const data = yield book_model_1.Book.updateOne({ _id: bookId }, updatedDoc, {
            new: true,
            runValidators: true,
        });
        console.log(data);
        res.status(200).json({
            success: true,
            message: "Book updated  successfully",
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateSingleBooks = updateSingleBooks;
const deleteSingleBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        console.log("server a book id", bookId);
        const data = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
        if (data) {
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Book not found",
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSingleBooks = deleteSingleBooks;
