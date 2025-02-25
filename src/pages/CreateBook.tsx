import { Controller, useForm } from "react-hook-form";

type FormData = {
  nomeLivro: string;
  quantidadeEstoque: number;
  preco: number;
  categoria: string;
};

export function CreateBook() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      nomeLivro: "",
      quantidadeEstoque: 0,
      preco: 0,
      categoria: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nomeLivro" className="block text-sm font-medium text-gray-700">
              Nome do livro
            </label>
            <Controller
              control={control}
              name="nomeLivro"
              render={({ field }) => (
                <input
                  type="text"
                  id="nomeLivro"
                  placeholder="Nome do livro"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="quantidadeEstoque" className="block text-sm font-medium text-gray-700">
              Quantidade em estoque
            </label>
            <Controller
              control={control}
              name="quantidadeEstoque"
              render={({ field }) => (
                <input
                  type="number"
                  id="quantidadeEstoque"
                  placeholder="Quantidade em estoque"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <Controller
              control={control}
              name="preco"
              render={({ field }) => (
                <input
                  type="number"
                  id="preco"
                  placeholder="Preço"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <Controller
              control={control}
              name="categoria"
              render={({ field }) => (
                <select
                  id="categoria"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...field}
                >
                  <option value="" disabled>
                    Selecione a categoria...
                  </option>
                  <option value="TERROR">Terror</option>
                  <option value="ROMANCE">Romance</option>
                </select>
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

