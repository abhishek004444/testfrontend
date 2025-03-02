import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import EditItem from "../pages/EditItem";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Navbar from "../components/Navbar";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin"); // Redirect to signin if not logged in
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes (Only accessible if logged in) */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddItem /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditItem /></PrivateRoute>} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
