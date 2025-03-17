import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext"; 

interface User {
  idUsuario: string;
  nome: string;
  sobrenome: string;
  login: string;
  cargos: string[];
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();
  const { session, isLoadingSession } = useContext(AuthContext);

  useEffect(() => {
    if (isLoadingSession) return;

    if (!session || !session.cargos || !session.cargos.includes("ADMIN")) {
      console.warn("Acesso negado. Redirecionando para login...");
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado. Redirecionando para login...");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }, [session, isLoadingSession, navigate]);

  function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setUsers(users.filter(user => user.idUsuario !== id));
      })
      .catch(error => console.error("Erro ao deletar usuário:", error));
  }

  function handlePromote(id: string) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuarios/${id}/tornar-admin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user.idUsuario === id ? updatedUser : user)));
        alert("Usuário tornado ADMIN com sucesso!");
      })
      .catch(error => console.error("Erro ao promover usuário:", error));
  }

  function handleDemote(id: string) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuarios/${id}/remover-admin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user.idUsuario === id ? updatedUser : user)));
        alert("Usuário rebaixado para USER com sucesso!");
      })
      .catch(error => console.error("Erro ao rebaixar usuário:", error));
  }

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">Voltar</a>
        <h2 className="text-lg font-semibold mb-4 text-center">Lista de Usuários</h2>
        
        <ul className="space-y-4">
          {selectedUsers.map(user => (
            <li key={user.idUsuario} className="p-4 border rounded-md shadow-sm flex justify-between items-center bg-gray-50 hover:shadow-lg transition-shadow">
              <div>
                <p className="text-lg font-medium text-gray-900">{user.nome} {user.sobrenome}</p>
                <p className="text-sm text-gray-600">Login: {user.login}</p>
                <p className="text-sm text-gray-600">Cargos: {user.cargos?.length ? user.cargos.join(", ") : "USER"}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleDelete(user.idUsuario)} 
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Deletar
                </button>
                <button 
                      onClick={() => 
                        (user.cargos?.includes("ADMIN") ?? false) ? handleDemote(user.idUsuario) : handlePromote(user.idUsuario)
                      } 
                      className={`px-2 py-1 text-sm rounded-md transition ${
                        (user.cargos?.includes("ADMIN") ?? false) 
                          ? "bg-yellow-500 hover:bg-yellow-600" 
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {(user.cargos?.includes("ADMIN") ?? false) ? "Tornar USER" : "Tornar ADMIN"}
                </button>

              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
