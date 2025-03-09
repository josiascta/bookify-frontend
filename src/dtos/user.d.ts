type UserAPIRole = "ADMIN" | "USER" | "MANAGER"

type UserAPIResponse = {
  idUsuario: string
  nome: string
  sobrenome: string
  login: string
  cargos: UserAPIRole[]
}