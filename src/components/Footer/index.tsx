import { FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope } from "react-icons/fa";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className="footer">
    <div className="footer-icons">
      <a href="https://www.instagram.com/seuPerfil" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://wa.me/seuNumero" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
      <a href="https://www.linkedin.com/in/seuPerfil" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="mailto:seuemail@example.com">
        <FaEnvelope />
      </a>
      <div className="fixed-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
    </div>
    </div>
    <hr />
    <p>© 2024 Todos os direitos reservados.</p>
  </footer>
);
}
