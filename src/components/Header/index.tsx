import styles from "./styles.module.css";
import logo from "../../assets/logoImg.png";
import iconBaixo from "../../assets/icons/setaBaixo.png";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Header() {
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
              <a
                href="/createBook"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cadastrar Livro
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Listar Livro
              </a>
            </div>
          )}
        </div>

        <div className="h-8 border-r border-gray-300 mx-4"></div>
        <a href="#" className="text-blue-500 font-bold">Carrinho</a>
        <div className="h-8 border-r border-gray-300 mx-4"></div>
        <a href="#" className="text-blue-500 font-bold">Login/Registrar</a>
      </div>
    </header>
  );
}
