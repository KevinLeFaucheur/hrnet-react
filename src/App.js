import { Route, Routes } from "react-router";
import { Employees } from "./pages/Employees";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}