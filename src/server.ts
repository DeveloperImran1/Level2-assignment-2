import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();
const port = process.env.PORT;

async function main() {
  console.log(process.env.DB_USER);
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hqv81rk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(uri);

    console.log("Mongodb is connected");

    app.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main().catch((err) => console.log(err));
