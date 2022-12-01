import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import ViewProduct from "./pages/ViewProduct";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Cart from "./pages/Cart";
import History from "./pages/History"
import Products from "./pages/Products"

import { DataProvider } from "./api/GlobalState";



function App() {
  return (
    <DataProvider>
      <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/cart" element= {<Cart/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/products" element = {<Products/>} />
        <Route path="products/:id" element = {<ViewProduct/>} />
        
      </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;
