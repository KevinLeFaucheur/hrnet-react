import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Employees } from "./pages/Employees";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}