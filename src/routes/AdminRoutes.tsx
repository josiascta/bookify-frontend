import { Routes, Route } from "react-router";
import { CreateBook } from "../pages/CreateBook";
import { ListBooks } from "../pages/ListBooks";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { HomeAdmin } from "../pages/PainelAdmin";
import { Profile } from "../pages/Profile";
import { UserList } from "../pages/UserList";
import { CreateAuthor } from "../pages/CreateAuthor";
import { ListAuthors } from "../pages/ListAuthors";


//rotas do adm(talvez mude a home do adm)
export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeAdmin />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/createBook/:id" element={<CreateBook />} />
        <Route path="/listBooks" element={<ListBooks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/createAuthor" element={<CreateAuthor />} />
        <Route path="/listAuthors" element={<ListAuthors />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
