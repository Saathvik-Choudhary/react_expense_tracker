import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./SaveExpense.css";

function SaveExpense() {
  const [formData, setFormData] = useState({
    cost: null,
    purchaseDate: null,
    title: null,
    currency: null,
  });
  const [errors, setErrors] = useState({});
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/expenses/currencies";

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCurrencyData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateNotEmpty = (value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }
    return "";
  };

  const handleCurrencyChange = (selectedOption) => {
    setFormData({ ...formData, currency: selectedOption.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validateNotEmpty(value);
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      const formattedData = {
        cost: parseFloat(formData.cost),
        title: formData.title,
        dateOfExpense: new Date(formData.purchaseDate).toISOString(),
        currency:formData.currency
      };

      const response = await fetch("http://localhost:8080/expenses", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    setFormData({
      title: null,
      cost: null,
      purchaseDate: null,
      currency: null
    });
  };

  const options = currencyData.map(currency => ({
    label: currency,
    value: currency
  }));

  return (
    <form className="SaveContainer" onSubmit={handleSubmit}>
      <button className="SaveButton" type="submit">Save</button>
      <input
        type="text"
        className="Input"
        id="title"
        name="title"
        placeholder="Title"
        value={formData.title || ""}
        onChange={handleChange}
      />
      <div className="InputCost">
        {errors.title && <p className="Error">{errors.title}</p>}
        <input
          className="Cost"        
          type="text"
          id="cost"
          name="cost"
          placeholder="Cost"
          value={formData.cost || ""}
          onChange={handleChange}
        />
        <Select
          className='DropDown'
          options={options}
          onChange={handleCurrencyChange}
          isSearchable={true}
          placeholder="Select a currency"
        />
      </div>

      {errors.cost && <p className="Error">{errors.cost}</p>}
      <input
        className="Input"
        type="Date"
        id="purchaseDate"
        name="purchaseDate"
        value={formData.purchaseDate || ""}
        onChange={handleChange}
      />

      {errors.purchaseDate && <p className="Error">{errors.purchaseDate}</p>}
    </form>
  );
}

export default SaveExpense;