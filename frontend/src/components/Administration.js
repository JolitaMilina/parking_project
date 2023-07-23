import React, { useState, useEffect } from "react";
import "../App.css";

const Administration = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    carType: "",
    price: 0,
  }); // AR GALIMA ISTRINTI OBJEKTA?

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // LOGIC FOR FETCHING

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/price_list`)
      .then((response) => response.json())
      .then((data) => {
        console.log(submittedData);
        setSubmittedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //   LOGIC FOR EDIT

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      carType: item.carType,
      price: item.price,
    });

    setIdToUpdate(item._id);
    setShowUpdateForm(true);
  };

  const handleChange = (e) => {};

  return (
    <>
      {" "}
      <h2 className="my-4">Administration</h2>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Weekdays</th>
              <th>Hours</th>
              <th>Car Type</th>
              <th className="text-end">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.weekdays.length > 1
                    ? `${Math.min.apply(Math, item.weekdays)} -
                  ${Math.max.apply(Math, item.weekdays)}`
                    : item.weekdays}
                </td>
                <td>
                  {Math.min.apply(Math, item.hours)} -
                  {Math.max.apply(Math, item.hours)} h
                </td>
                <td>{item.carType}</td>
                <td className="text-end">
                  {Intl.NumberFormat("lt-LT", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                  }).format(item.price)}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateForm && (
          <form className="p-4 border rounded bg-light">
            {`Update price for ${formData.carType}`}
            <input
              onChange={handleChange}
              value={formData.price}
              type="text"
              className="form-control, col-1 m-2"
            ></input>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default Administration;
