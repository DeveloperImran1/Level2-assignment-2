import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const port = 5000;

async function main() {
  try {
    const uri =
      "mongodb+srv://library:library@cluster0.hqv81rk.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);

    console.log("Mongodb is connected");

    server = app.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main().catch((err) => console.log(err));
