import Entry from "../models/entries.model.js";
import priceList from "../models/priceList.model.js";
import { calculatePrice } from "../PriceCalculation.js";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

//  REQUESTS

export const getEntries = async (_req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error..." });
  }
};

export const getPriceList = async (_req, res) => {
  try {
    const list = await priceList.find().sort({ carType: 1 });
    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error..." });
  }
};

export const updatePriceList = async (req, res) => {
  try {
    const updatedPriceList = await priceList.findByIdAndUpdate(
      req.params.id,
      { price: req.body.price },
      { new: true }
    );

    if (!updatedPriceList) {
      return res.status(404).json({ message: "Price List not found" });
    }

    res.status(200).json(updatedPriceList);
  } catch (error) {
    console.log("Failed to update price list: " + error);
    res.status(500).json({ message: "Error updating" });
  }
};

export const postUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  getPlateNumber(req.file.path);

  res.status(201).json({});
};

// PLATE REZOGNIZER

const getPlateNumber = (fileName) => {
  let body = new FormData();
  body.append("upload", fs.createReadStream(fileName));
  body.append("regions", "lt");
  fetch("https://api.platerecognizer.com/v1/plate-reader/", {
    method: "POST",
    headers: {
      Authorization: process.env.PARK_AUTHORIZATION,
    },
    body: body,
  })
    .then((res) => res.json())
    .then((json) => {
      //console.log(json);
      saveToDb(json.results[0].plate, json.results[0].vehicle.type);
    })
    .catch((err) => {
      console.log(err);
    });
};

// SAVES DATA TO DB AND CHECKS IF PLATE NUMBER & ENTRY OUT ALREADY EXISTS
const saveToDb = async (plateNumber, vehicleType) => {
  try {
    const existingEntry = await Entry.findOne({
      plate: plateNumber,
      entryOut: { $exists: false },
    });

    if (existingEntry) {
      existingEntry.entryOut = new Date();
      existingEntry.price = await calculatePrice(
        existingEntry.entryIn,
        existingEntry.entryOut,
        vehicleType
      );
      await existingEntry.save();
    } else {
      const newEntry = new Entry({
        plate: plateNumber,
        carType: vehicleType,
        entryIn: new Date(),
        price: 0,
      });

      await newEntry.save();
    }
  } catch (error) {
    console.error;
  }
};
