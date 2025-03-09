import { useNavigate } from "react-router";
import { useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";

type CustomJwtPayload = JwtPayload & {
  roles?: string[];
};

type Login = {
  login: string;
  senha: string;
};

export function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { session, save } = useAuth();


  async function login(loginDTO: Login) {
    const response = await fetch("http://localhost:8080/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDTO),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const token = await response.text();
    localStorage.setItem("token", token);

    const decoded: CustomJwtPayload = jwtDecode(token);
    const idUser = decoded.sub;

    const responseInfoUser = await fetch(`http://localhost:8080/auth/${idUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const reponseJson = await responseInfoUser.json()
    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    save(reponseJson);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const loginDTO: Login = { login: nome, senha: senha };
    try {
      await login(loginDTO);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Formulário */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Bem-vindo!</h1>
          <p className="text-gray-500">Faça login para continuar</p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">E-mail</label>
              <input
                onChange={(e) => setNome(e.target.value)}
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Digite seu e-mail"
                value={nome}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Senha</label>
              <input
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Digite sua senha"
                value={senha}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Ainda não tem uma conta?{" "}
            <a
              href="#"
              className="font-bold"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>

      {/* Ilustração */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img
          src="/Login.jpg"
          alt="Placeholder Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
