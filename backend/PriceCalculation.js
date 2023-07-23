import PriceList from "./models/priceList.model.js";

const getWeekdayAndHour = (date) => {
  return {
    weekDayNumber: date.getDay(),
    hours: date.getHours(),
  };
};

const splitByHour = (dateFrom, dateTo, billableHours) => {
  const result = [];

  let currentHour = new Date(dateFrom);

  currentHour.setMinutes(0, 0, 0);

  while (currentHour <= dateTo) {
    result.push({
      hour: getWeekdayAndHour(new Date(currentHour))["hours"],
      price: getPrice(
        getWeekdayAndHour(new Date(currentHour))["weekDayNumber"],
        getWeekdayAndHour(new Date(currentHour))["hours"],
        billableHours
      ),
    });
    currentHour.setHours(currentHour.getHours() + 1);
  }
  return result;
};

const getPrice = (weekday, hour, billableHours) => {
  const priceLot = billableHours.find(
    ({ weekdays, hours }) => weekdays.includes(weekday) && hours.includes(hour)
  ) || { price: 0 };

  return priceLot.price;
};

const sumBillableHours = (billableHours, dateFrom, dateTo) => {
  return splitByHour(dateFrom, dateTo, billableHours).reduce(
    (a, v) => (a = a + v.price),
    0
  );
};

export const calculatePrice = async (dateFrom, dateTo, carType) => {
  try {
    const priceList = await PriceList.find({
      carType: normalizeCarType(carType),
    });

    return sumBillableHours(priceList, dateFrom, dateTo);
  } catch (error) {
    console.error;
  }
};

const normalizeCarType = (vehicleType) => {
  if (["SUV", "Sedan"].includes(vehicleType)) {
    return "car";
  } else if (["Big Truck"].includes(vehicleType)) {
    return "truck";
  } else {
    return "motorcycle";
  }
};
