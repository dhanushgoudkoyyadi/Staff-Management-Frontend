import React, { useState } from "react";
import { useSignupMutation } from "../../service/leads"; // Adjust path as per your structure
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    mobilenumber: "",
    gender: "",
  });

  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, password, email, mobilenumber, gender } = formData;

    if (!username || !password || !email || !mobilenumber || !gender) {
      alert("All fields are required!");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobilenumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await signup(formData).unwrap(); // Send formData to backend
      localStorage.setItem("token", response.token);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          type="tel"
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a strong password"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Register;