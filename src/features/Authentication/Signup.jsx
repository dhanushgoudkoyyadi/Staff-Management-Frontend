import React, { useState } from "react";
import { useSignupMutation } from "../../leads";





function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  
  const [signup, { isLoading }] =useSignupMutation("")
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !mobileNumber || !gender || !email || !password ) {
      alert("All fields are required!");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one number and one special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await signup({ username, password, mobileNumber, email, gender }).unwrap();
      localStorage.setItem('token', response.token);
      alert('Signup successful!');
      navigate('/Home');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter a strong password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
            <input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your 10-digit mobile number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender:</label>
            <div className="gender-options">
              <label htmlFor="male">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </label>
              <label htmlFor="female">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Female
              </label>
            </div>
          </div>

         

          <button type="submit" disabled={isLoading} className="register-button">
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        
       
      </div>
    </div>
  );
}

export default Register;
