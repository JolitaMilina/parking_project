import { Schema, model } from "mongoose";

const priceListSchema = new Schema({
  carType: String,
  price: Number,
  billableHoursId: Number,
  weekdays: Array,
  hours: Array,
});

const PriceList = model("priceLists", priceListSchema);

const hours = [
  {
    weekdays: [1, 2, 3, 4],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  {
    weekdays: [5],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },
  {
    weekdays: [6],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
  },
];

const vehicles = ["car", "motorcycle", "truck"];

const prices = [
  { name: "car", id: 0, price: 1 },
  { name: "car", id: 1, price: 2 },
  { name: "car", id: 2, price: 4 },
  { name: "motorcycle", id: 0, price: 0.5 },
  { name: "motorcycle", id: 1, price: 1.5 },
  { name: "motorcycle", id: 2, price: 2 },
  { name: "truck", id: 0, price: 2 },
  { name: "truck", id: 1, price: 3.5 },
  { name: "truck", id: 2, price: 5 },
];

const initPriceList = () => {
  vehicles.forEach((v) => {
    hours.forEach((i, index) => {
      const newEntry = new PriceList({
        carType: v,
        weekdays: i.weekdays,
        hours: i.hours,
        price: prices.find((e) => e.name === v && e.id === index).price,
      });

      newEntry.save();
    });
  });
};

//initPriceList();

export default PriceList;
