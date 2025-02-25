import styles from "./styles.module.css"

import { Outlet } from "react-router"
import { Header } from "../Header"

export function Layout(){
  return (
    <div>
      <Header/>
      <Outlet/>
      
    </div>
  )
}