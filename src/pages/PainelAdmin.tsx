import { useNavigate } from "react-router";

export function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      <div className="grid grid-cols-3 gap-6">
        <button
          className="w-48 h-48 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                     hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/createBook")}
        >
          Cadastrar Livro
        </button>
        <button
          className="w-48 h-48 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                     hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/listBooks")}
        >
          Listar Livros
        </button>
        <button
          className="w-48 h-48 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                     hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/createAuthor")}
        >
          Cadastrar Autor
        </button>
        <button
          className="w-48 h-48 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                     hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/listAuthors")}
        >
          Listar Autores
        </button>
        <button
          className="w-48 h-48 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                     hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/userList")}
        >
          Editar Usuário
        </button>
      </div>
    </div>
  );
}
