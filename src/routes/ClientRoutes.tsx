import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

//rotas do adm(talvez mude a home do adm)
export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}