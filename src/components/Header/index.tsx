import styles from "./styles.module.css";
import logo from "../../assets/logoImg.png";
import iconBaixo from "../../assets/icons/setaBaixo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const {session} = useAuth()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  function home() {
    nav("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={home}>
        <img src={logo} alt="Imagem de um livro" />
        <h1>bookify</h1>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button onClick={toggleDropdown} className={styles.buttonLivros}>
            <p className="text-blue-500 font-bold">Livro</p>
            <img src={iconBaixo} alt="Ícone para baixo" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <Link
                to="/createBook"
                onClick={() => {
                  toggleDropdown();
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cadastrar Livro
              </Link>
              <Link
                to="/listBooks"
                onClick={() => {
                  toggleDropdown();
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Listar Livro
              </Link>
            </div>
          )}
        </div>

        <div className="h-8 border-r border-gray-300 mx-4"></div>
        <a href="#" className="text-blue-500 font-bold">
          Carrinho
        </a>
        <div className="h-8 border-r border-gray-300 mx-4"></div>
        {/* Botão de Login com redirecionamento */}
        <button
          onClick={() => nav("/profile")}
          className="text-blue-500 font-bold flex items-center justify-center gap-1 cursor-pointer"
        >
          <FaUser />
          <p>{session?.nome}</p>
        </button>
      </div>
    </header>
  );
}
