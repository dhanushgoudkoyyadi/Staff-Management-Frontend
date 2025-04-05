import Home from "./features/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./features/Authentication/Signup";
import Login from "./features/Authentication/Login";
import Dashboard from "./features/Dashboard/Dashboard";
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
    </Routes>
  </Router>
  );
}

export default App;
