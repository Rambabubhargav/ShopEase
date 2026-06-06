import { Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import { About } from "../Pages/About";
import Products from "../Pages/Products";
import { Cart } from "../Pages/Cart";
import { Contact } from "../Pages/Contact";
import { Login } from "../Features/Authentication/Login";
import { Signup } from "../Features/Authentication/Signup";
import { SinglePage } from "../Features/Productlist/SinglePage";
import { Profile } from "../Components/Profile";
import { Orders } from "../Components/Orders";
import { Wishlist } from "../Components/Wishlist";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products/:id" element={<SinglePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/wishlist" element={<Wishlist />} />
      
    </Routes>
  );
};