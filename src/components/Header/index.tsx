import styles from "./styles.module.css";
import logo from "../../assets/logoImg.png";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { session } = useAuth();

  const nav = useNavigate();

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
        <button
          onClick={() => nav("/profile")}
          className="text-blue-500 font-bold flex items-center justify-center gap-1 cursor-pointer"
        >
          <FaUser />
          <p>{session?.nome}</p>
        </button>

        {session?.cargos[0] === "USER" && (
          <>
            <div className="h-8 border-r border-gray-300 mx-4"></div>
            <a href="#" className="text-blue-500 font-bold">
              <FaShoppingCart size={23} color="" />
            </a>
          </>
        )}
      </div>
    </header>
  );
}
