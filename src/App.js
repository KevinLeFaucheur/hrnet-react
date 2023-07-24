import { Route, Routes } from "react-router";
import { Employees } from "./pages/Employees";
import { Home } from "./pages/Home";
import { createContext } from "react";
import dataMocks from "./employees.json"

export const DataContext = createContext(null);

export const App = () => {
  const useMocks = true;
  const employees = useMocks ? dataMocks : [];

  return (
    <DataContext.Provider value={employees}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>      
    </DataContext.Provider>
  );
}