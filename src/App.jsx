import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import CatalogPage from "./Pages/Catalog/CatalogPage";
import CarDetails from "./Components/CarDetails/CarDetails";
import Header from "./Components/Header/Header";

const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
      </Routes>
      </>
  );
};

export default App;
