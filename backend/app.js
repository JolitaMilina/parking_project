import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

import {
  getEntries,
  getPriceList,
  postUpload,
  updatePriceList,
} from "./controllers/client.controllers.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5001;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Conenected to MongoDB"))
  .catch((e) => console.log("Error connecting to MongoDB: " + e));

// MIDDLEWEARS
app.use(express.json());

// STORAGE FOR UPLOADED FILES
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

// REST API ENDPOINTS
app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

// ROUTES
app.get("/api/entries", getEntries);
app.get("/api/price_list", getPriceList);
app.put("/api/price_list/:id", updatePriceList);
app.post("/api/upload", upload.single("image"), postUpload);

// STARTING SERVER
app.listen(PORT, () => console.log("Server is running on PORT:" + PORT));
