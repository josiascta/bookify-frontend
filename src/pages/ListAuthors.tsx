import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Author {
  id: number;
  name: string;
}

export function ListAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/autor/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setAuthors(data || []))
      .catch((error) => console.error("Erro ao buscar autores:", error));
  }, [token]);

  function handleDelete(id: number) {
    if (!token) {
      alert("Você precisa estar autenticado para deletar um autor.");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm("Você deseja remover esse autor?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/autor/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => setAuthors(authors.filter((author) => author.id !== id)))
        .catch((error) => console.error("Erro ao deletar autor:", error));
    }
  }

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>
        <h2 className="text-lg font-semibold mb-4 text-center">Lista de Autores</h2>
        <ul className="space-y-4">
          {currentAuthors.map((author) => (
            <li
              key={author.id}
              className="p-4 border rounded-md shadow-sm flex justify-between items-center bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-medium text-gray-900">{author.name}</p>
              <button
                onClick={() => handleDelete(author.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastAuthor < authors.length ? prev + 1 : prev
              )
            }
            disabled={indexOfLastAuthor >= authors.length}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
