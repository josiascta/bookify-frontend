import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Perfil</h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">ID:</label>
          <p className="bg-gray-200 p-2 rounded-md">123456</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Email:
          </label>
          <p className="bg-gray-200 p-2 rounded-md">usuario@email.com</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Senha:
          </label>
          <p className="bg-gray-200 p-2 rounded-md">********</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Cargo:
          </label>
          <p className="bg-gray-200 p-2 rounded-md">Administrador</p>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Editar Informações
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
