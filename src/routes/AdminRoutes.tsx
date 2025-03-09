import { Routes, Route } from "react-router";
import { CreateBook } from "../pages/CreateBook";
import { ListBooks } from "../pages/ListBooks";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

//rotas do adm(talvez mude a home do adm)
export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/createBook/:id" element={<CreateBook />} />
        <Route path="/listBooks" element={<ListBooks />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
