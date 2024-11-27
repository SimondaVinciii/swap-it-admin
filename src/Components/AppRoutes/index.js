import { Routes, Route, Navigate } from "react-router-dom";
import Transactions from "../../Pages/Transactions";
import Users from "../../Pages/Users";
import Items from "../../Pages/Items";
import Payments from "../../Pages/Payments";
import Login from "../../Pages/Login";

function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/items"
        element={isAuthenticated ? <Items /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/transactions"
        element={
          isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/payments"
        element={
          isAuthenticated ? <Payments /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/"
        element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
export default AppRoutes;
