import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "../../Pages/Transactions";
import Users from "../../Pages/Users";
import Items from "../../Pages/Items";
import Payments from "../../Pages/Payments";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route> */}
      <Route path="/items" element={<Items />}></Route>
      <Route path="/transactions" element={<Transactions />}></Route>
      <Route path="/payments" element={<Payments />}></Route>
      <Route path="/" element={<Users />}></Route>
    </Routes>
  );
}
export default AppRoutes;
