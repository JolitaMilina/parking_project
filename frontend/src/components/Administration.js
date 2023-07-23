import React, { useState, useEffect } from "react";
import "../App.css";

const Administration = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // LOGIC FOR FETCHING

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/price_list`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(submittedData);
        setSubmittedData(data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //   LOGIC FOR EDIT

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      price: item.price.toString(),
      carType: item.carType,
      weekdays: item.weekdays,
      hours: item.hours,
    });

    setIdToUpdate(item._id);
    setShowUpdateForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      price: e.target.value,
    });
    console.log(formData);
  };

  const formatWeekdays = (weekdays) => {
    if (weekdays.length > 1) {
      return `${Math.min.apply(Math, weekdays)} - ${Math.max.apply(
        Math,
        weekdays
      )}`;
    } else {
      return weekdays;
    }
  };

  const formatHours = (hours) => {
    return `${Math.min.apply(Math, hours)} -
                  ${Math.max.apply(Math, hours)} h`;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/price_list/${idToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();

          setShowUpdateForm(false);
        }
      })

      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <>
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
                <td>{formatWeekdays(item.weekdays)}</td>
                <td>{formatHours(item.hours)}</td>
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
            Update price for{" "}
            {`${formatWeekdays(formData.weekdays)} wkd ${formatHours(
              formData.hours
            )} ${formData.carType}`}
            <input
              onChange={handleChange}
              value={formData.price}
              type="text"
              className="form-control, col-1 m-2"
            ></input>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default Administration;
