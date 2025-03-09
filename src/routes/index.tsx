import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { Loading } from "../components/Loading/Loading";

export function Routes() {
  const { session } = useAuth();
  const isLoading = false;

  function RouteSelector() {
    const role = session?.cargos[0];

    switch (role) {
      case "ADMIN":
        return <AdminRoutes />;
      case "USER":
        return <ClientRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <RouteSelector />
    </BrowserRouter>
  );
}
