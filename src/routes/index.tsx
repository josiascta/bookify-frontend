import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { Loading } from "../components/Loading/Loading";

export function Routes() {
  const { session, isLoadingSession } = useAuth();

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

  if (isLoadingSession) {
    return <Loading />; 
  }

  return (
    <BrowserRouter>
      <RouteSelector />
    </BrowserRouter>
  );
}
