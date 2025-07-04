import cors from "cors";
import express, { Application } from "express";
import {
  createBook,
  deleteSingleBooks,
  getBooks,
  getSingleBooks,
  updateSingleBooks,
} from "./app/controllers/books.controller";
import { createBorrow, getBorrow } from "./app/controllers/borrows.controller";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-client-lac.vercel.app",
    ],
  })
);

const router = express.Router();

app.use(express.json());
app.use(router);

router.post("/api/books", createBook);
router.get("/api/books", getBooks);
router.get("/api/books/:bookId", getSingleBooks);
router.put("/api/books/:bookId", updateSingleBooks);
router.delete("/api/books/:bookId", deleteSingleBooks);

router.post("/api/borrow", createBorrow);
router.get("/api/borrow", getBorrow);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(globalErrorHandler);

export default app;
