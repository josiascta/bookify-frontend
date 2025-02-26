import styles from "./styles.module.css"
import { Outlet } from "react-router"
import { Header } from "../Header"
import { Footer } from "../Footer"

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />

      <Outlet />
      
      <Footer />
    </div>
  )
}
