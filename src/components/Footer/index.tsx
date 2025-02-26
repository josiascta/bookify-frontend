import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./styles.module.css";
import { Divider } from '@mui/material';


export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divIcons}>
        <a
          href="https://www.instagram.com/seuPerfil"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className={styles.icons}/>
        </a>
        <a
          href="https://wa.me/seuNumero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className={styles.icons}/>
        </a>
        <a
          href="https://www.linkedin.com/in/seuPerfil"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={styles.icons}/>
        </a>
        <a href="mailto:seuemail@example.com">
          <FaEnvelope className={styles.icons}/>
        </a>
      </div>
      
      <Divider 
        sx={{
          width: '75%',
          backgroundColor: '#ffffff', 
          margin: '0px auto',
          marginBottom: '20px' 
        }} 
      />

      <p>© 2024 Todos os direitos reservados.</p>
    </footer>
  );
}
