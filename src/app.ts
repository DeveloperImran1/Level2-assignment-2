import express, { Application } from "express";
import { booksRoute } from "./app/controllers/books.controller";

const app: Application = express();
app.use(express.json());

app.use("/api", booksRoute);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
