import React, { useState } from "react";

const Salary = () => {
  const [salary, setSalary] = useState({
    basicPay: "",
    allowances: { hra: "", da: "", travel: "" },
    deductions: { pf: "", tax: "", loans: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setSalary((prevSalary) => ({
        ...prevSalary,
        [keys[0]]: { ...prevSalary[keys[0]], [keys[1]]: value },
      }));
    } else {
      setSalary((prevSalary) => ({ ...prevSalary, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6788/addsalary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salary),
      });

      if (response.ok) {
        alert("Salary structure saved successfully!");
        setSalary({
          basicPay: "",
          allowances: { hra: "", da: "", travel: "" },
          deductions: { pf: "", tax: "", loans: "" },
        });
      } else {
        alert("Failed to save salary structure. Please try again.");
      }
    } catch (error) {
      console.error("Error saving salary structure:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h3>Salary Structure</h3>
      <input
        type="number"
        name="basicPay"
        placeholder="Basic Pay"
        value={salary.basicPay}
        onChange={handleChange}
        className="form-control my-2"
      />
      <h4>Allowances</h4>
      <input
        type="number"
        name="allowances.hra"
        placeholder="HRA"
        value={salary.allowances.hra}
        onChange={handleChange}
        className="form-control my-2"
      />
      <input
        type="number"
        name="allowances.da"
        placeholder="DA"
        value={salary.allowances.da}
        onChange={handleChange}
        className="form-control my-2"
      />
      <input
        type="number"
        name="allowances.travel"
        placeholder="Travel"
        value={salary.allowances.travel}
        onChange={handleChange}
        className="form-control my-2"
      />
      <h4>Deductions</h4>
      <input
        type="number"
        name="deductions.pf"
        placeholder="PF"
        value={salary.deductions.pf}
        onChange={handleChange}
        className="form-control my-2"
      />
      <input
        type="number"
        name="deductions.tax"
        placeholder="Tax"
        value={salary.deductions.tax}
        onChange={handleChange}
        className="form-control my-2"
      />
      <input
        type="number"
        name="deductions.loans"
        placeholder="Loans"
        value={salary.deductions.loans}
        onChange={handleChange}
        className="form-control my-2"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Save
      </button>
    </form>
  );
};

export default Salary;