import React, { useState, useEffect } from "react";

const SalaryDisplay = () => {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await fetch("http://localhost:6788/getsalary");
        if (!response.ok) {
          throw new Error("Failed to fetch salary data");
        }
        const data = await response.json();
        setSalaries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalaries();
  }, []);

  const calculateNetSalary = (salary) => {
    const basicPay = Number(salary.basicPay);
    const allowances = Number(salary.allowances.hra) + Number(salary.allowances.da) + Number(salary.allowances.travel);
    const deductions = Number(salary.deductions.pf) + Number(salary.deductions.tax) + Number(salary.deductions.loans);

    return basicPay + allowances - deductions;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h3 className="text-center">Employee Salary Details</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!isLoading && !error && salaries.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Basic Pay</th>
              <th>Allowances</th>
              <th>HRA</th>
              <th>DA</th>
              <th>Travel</th>
              <th>Deductions</th>
              <th>PF</th>
              <th>Tax</th>
              <th>Loans</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => {
              const netSalary = calculateNetSalary(salary);
              return (
                <tr key={salary._id}>
                  <td>₹{salary.basicPay}</td>
                  <td>₹{Number(salary.allowances.hra) + Number(salary.allowances.da) + Number(salary.allowances.travel)}</td>
                  <td>₹{salary.allowances.hra}</td>
                  <td>₹{salary.allowances.da}</td>
                  <td>₹{salary.allowances.travel}</td>
                  <td>₹{Number(salary.deductions.pf) + Number(salary.deductions.tax) + Number(salary.deductions.loans)}</td>
                  <td>₹{salary.deductions.pf}</td>
                  <td>₹{salary.deductions.tax}</td>
                  <td>₹{salary.deductions.loans}</td>
                  <td>₹{netSalary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {!isLoading && salaries.length === 0 && <p>No salary data found.</p>}
    </div>
  );
};

export default SalaryDisplay;