import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext"; // Verifique se o caminho está correto!

interface User {
  idUsuario: string;
  nome: string;
  sobrenome: string;
  login: string;
  cargos: string[];
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { session, isLoadingSession } = useContext(AuthContext);

  useEffect(() => {
    if (isLoadingSession) return;

    // Se o usuário não estiver autenticado ou não for ADMIN, redireciona para login
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
            Authorization: `Bearer ${token}`,  // Envia o token JWT
            "Content-Type": "application/json",
          },
    })
      .then(response => {
        console.log("Resposta da API:", response);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Usuários recebidos:", data);
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
  

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>
        <h2 className="text-lg font-semibold mb-4 text-center">Lista de Usuários</h2>
        <ul className="space-y-4">
            {users.map(user => (
                <li key={user.idUsuario} className="p-4 border rounded-md shadow-sm flex justify-between items-center bg-gray-50 hover:shadow-lg transition-shadow">
                <div>
                    <p className="text-lg font-medium text-gray-900">{user.nome} {user.sobrenome}</p>
                    <p className="text-sm text-gray-600">Login: {user.login}</p>
                    <p className="text-sm text-gray-600">Cargos: {user.cargos?.length ? user.cargos.join(", ") : "ADMIN"}</p>
                </div>
                <div className="flex space-x-2">
                    <button 
                    onClick={() => handleDelete(user.idUsuario)} 
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                    Deletar
                    </button>
                    <button 
                    onClick={() => handlePromote(user.idUsuario)} 
                    className="px-2 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                    Tornar ADMIN
                    </button>
                </div>
                </li>
            ))}
        </ul>


      </div>
    </div>
  );
}
