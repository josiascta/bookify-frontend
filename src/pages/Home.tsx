import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Book {
  id: number;
  title: string;
  quantity_stock: number;
  price: number;
  autores: { name: string }[];
  category: string;
}

const categories = [
  { name: "Ficção", icon: "📖" },
  { name: "Não Ficção", icon: "📚" },
  { name: "Ciência", icon: "🔬" },
  { name: "História", icon: "🌍" },
  { name: "Fantasia", icon: "🧙" },
  { name: "Biografia", icon: "👤" },
  { name: "Mistério", icon: "🕵️" },
];

const carouselImages = ["../Login.jpg", "../C1.jpg", "../C2.jpg"];

export function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/livro", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        if (books.length !== data.content?.length) {
          setBooks(data.content || []);
        }
      })
      .catch((error) => console.error("Erro ao buscar livros:", error));
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = currentPage * booksPerPage;
  const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Carrossel */}
      <div className="w-full max-w-6xl mb-6">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Lista de livros com paginação */}
      <div className="max-w-6xl w-full p-6 bg-blue-400 rounded-lg shadow-md mb-6">
        <h3 className="text-md font-semibold mb-4 text-center text-white">Livros em promoção</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {selectedBooks.map((book) => (
            <div className="bg-white p-4 rounded-lg shadow-lg w-52 flex-shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt={book.title}
                className="w-full h-60 object-cover mb-2"
              />
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1">
                44% off
              </span>
              <h3 className="text-sm font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-700 text-sm">
                R$ {book.price.toFixed(2)}{" "}
                <span className="line-through text-gray-500">
                  R$ {book.price.toFixed(2)}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Seção de categorias */}
      <div className="max-w-6xl w-full p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="text-md font-semibold mb-4 text-center">Categorias</h3>
        <div className="flex justify-center gap-6 overflow-x-auto p-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 bg-gray-200 rounded-md text-center w-24"
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
