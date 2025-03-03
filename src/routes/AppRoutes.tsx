import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { CreateBook } from "../pages/CreateBook";
import { ListBooks } from "../pages/ListBooks";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
  return (
    <Routes>
       
       <Route path="/Register" element={<Register />} />
      
       <Route path="/Login" element={<Login />} />
      
      <Route path="/" element={<Layout />}>
        
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/createBook/:id" element={<CreateBook />} />
        <Route path="/listBooks" element={<ListBooks />} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}