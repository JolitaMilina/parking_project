import React, { useState, useEffect } from "react";

const Entries = () => {
  const [retrievedData, setRetrievedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // LOGIC FOR FETCHING

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/entries`)
      .then((response) => response.json())
      .then((data) => {
        setRetrievedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // LOGIC FOR DATE CONVERTER

  const formatDateString = (dateString) => {
    return new Date(dateString).toLocaleDateString("en", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // LOGIC FOR CURRENCY FORMATING

  const formatCurrency = (n) => {
    return Intl.NumberFormat("lt", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(n);
  };

  // LOGIC FOR SORTING from newest entry

  const sortedData = [...retrievedData].sort((a, b) => {
    const dateA = new Date(a.entryIn);
    const dateB = new Date(b.entryIn);
    return dateB - dateA;
  });

  return (
    <>
      <h2 className="my-4">Entries log</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Car Type</th>
              <th>Plate</th>
              <th>Time In</th>
              <th>Time out</th>
              <th className="text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item._id}
                className={item.entryOut ? "table-success" : ""}
              >
                <td>{item.carType}</td>
                <td>{item.plate}</td>
                <td>{formatDateString(item.entryIn)}</td>
                <td>{item.entryOut && formatDateString(item.entryOut)}</td>
                <td className="text-end">
                  {item.entryOut && formatCurrency(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Entries;
