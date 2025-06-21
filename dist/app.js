"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(router);
router.post("/api/books", books_controller_1.createBook);
router.get("/api/books", books_controller_1.getBooks);
router.get("/api/books/:bookId", books_controller_1.getSingleBooks);
router.put("/api/books/:bookId", books_controller_1.updateSingleBooks);
router.delete("/api/books/:bookId", books_controller_1.deleteSingleBooks);
router.post("/api/borrow", borrows_controller_1.createBorrow);
router.get("/api/borrow", borrows_controller_1.getBorrow);
app.use(globalErrorHandler_1.default);
app.get("/", (req, res) => {
    res.send("Server is running!");
});
exports.default = app;
