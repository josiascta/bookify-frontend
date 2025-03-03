import { useNavigate } from "react-router";

export function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Formulario*/}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Criar uma Conta</h1>
          <p className="text-gray-500">Cadastre-se para começar</p>
          
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">Nome</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Digite seu nome" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">E-mail</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="Digite seu e-mail" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Senha</label>
              <input type="password" className="w-full p-2 border rounded-md" placeholder="Digite sua senha" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Confirmar Senha</label>
              <input type="password" className="w-full p-2 border rounded-md" placeholder="Confirme sua senha" />
            </div>

            <button className="w-full bg-black text-white py-2 rounded-md">Registrar</button>
          </form>
          
          <p className="mt-4 text-center text-sm">
            Já tem uma conta? <a href="#" className="font-bold" onClick={() => navigate("/login")}>Entrar</a>
          </p>
        </div>
      </div>

      {/* Ilustração  */}
      <div className="w-1/2 flex items-center justify-center bg-white">
      <img src="/Login.jpg" alt="Placeholder Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
