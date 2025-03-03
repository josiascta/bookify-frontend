import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Book {
  id: number;
  title: string;
  quantity_stock: number;
  price: number;
  autores: { name: string }[];
  category: string;
}

export function ListBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/livro")
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data); 
        if (books.length !== data.content?.length) {
          setBooks(data.content || []);
        }
      })
      .catch(error => console.error("Erro ao buscar livros:", error));
  }, []); 
  

  function handleEdit(id: number) {
    navigate(`/createBook/${id}`);
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm("Você deseja remover esse livro?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/livro/${id}`, { method: "DELETE" })
        .then(() => setBooks(books.filter(book => book.id !== id)))
        .catch(error => console.error("Erro ao deletar livro:", error));
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>
        <h2 className="text-lg font-semibold mb-4 text-center">Lista de Livros</h2>
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 border rounded-md shadow-sm flex justify-between items-center bg-gray-50 hover:shadow-lg transition-shadow">
              <div>
                <p className="text-lg font-medium text-gray-900">{book.title}</p>
                <p className="text-sm text-gray-600">Autor: {book.autores?.length ? book.autores.map(a => a.name).join(", ") : "Sem autor"}</p>
                <p className="text-sm text-gray-600">Categoria: {book.category.charAt(0).toUpperCase() + book.category.slice(1).toLowerCase()}</p>
                <p className="text-sm text-gray-600">Estoque: {book.quantity_stock}</p>
                <p className="text-sm text-gray-600">Preço: R$ {book.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(book.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
