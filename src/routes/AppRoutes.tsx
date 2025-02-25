import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { CreateBook } from "../pages/CreateBook";

export function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route path="/createBook" element={<CreateBook />} />
        
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}