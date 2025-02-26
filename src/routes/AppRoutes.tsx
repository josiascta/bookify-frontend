import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { CreateBook } from "../pages/CreateBook";
import { ListBooks } from "../pages/ListBooks";


export function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/createBook/:id" element={<CreateBook />} />
        <Route path="/listBooks" element={<ListBooks />} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}