import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { borrowStaticMethod, IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow, borrowStaticMethod>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static(
  "updateAvailability",
  async function (body: IBorrow, bookData: IBook) {
    // Deduct quantity
    bookData.copies -= body.quantity;

    // if no copie left, mark it unavailable
    if (bookData.copies == 0) {
      bookData.available = false;
    }

    return bookData;
  }
);

export const Borrow = model<IBorrow, borrowStaticMethod>(
  "Borrow",
  borrowSchema
);
