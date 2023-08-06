import { Route, Routes } from "react-router";
import { Employees } from "./pages/Employees";
import { CreateEmployee } from "./pages/CreateEmployee";
import { createContext } from "react";
import { Layout } from "./layout/Layout";
import dataMocks from "./employees.json";

export const DataContext = createContext(null);

export const App = () => {
  const useMocks = true;
  const employees = useMocks ? dataMocks : [];

  return (
    <DataContext.Provider value={employees}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employees" element={<Employees />} />
        </Route>
      </Routes>      
    </DataContext.Provider>
  );
}