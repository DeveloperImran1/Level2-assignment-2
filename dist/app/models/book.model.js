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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("./borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "title field is required"] },
    author: { type: String, required: [true, "author field is required"] },
    genre: {
        type: String,
        required: [true, "genere field is required"],
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    description: { type: String },
    copies: {
        type: Number,
        required: [true, "copies field is required"],
        min: [0, "Negative value not allow"],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
