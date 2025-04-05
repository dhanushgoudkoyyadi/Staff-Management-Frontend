import Home from "./features/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./features/Authentication/Signup";
import Login from "./features/Authentication/Login";
import Dashboard from "./features/Dashboard/Dashboard";
import Salary from "./features/admin/Salary";
import Salarydetails from "./features/salary/Salarydetails"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/salary" element={<Salary/>} />
        <Route path="/getsalary" element={<Salarydetails/>} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;