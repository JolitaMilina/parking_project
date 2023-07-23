import { Schema, model } from "mongoose";

const entriesSchema = new Schema({
  carType: String,
  plate: String,
  entryIn: {
    type: Date,
  },
  entryOut: {
    type: Date,
  },
  price: Number,
});

const Entry = model("entries", entriesSchema);

export default Entry;
