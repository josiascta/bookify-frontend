import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type FormData = {
  nomeLivro: string;
  quantidadeEstoque: number;
  preco: number;
  categoria: string;
  autores: number[];
};

type Autor = {
  id: number;
  name: string;
};

export function CreateBook() {
  const { control, handleSubmit, reset, setValue} = useForm<FormData>({
    defaultValues: {
      nomeLivro: "",
      quantidadeEstoque: 0,
      preco: 0,
      categoria: "",
      autores: [],
    },
  });
  const [categorias, setCategorias] = useState<string[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [livroId, setLivroId] = useState<number | null>(null);
  const { id } = useParams();

  async function retornarCategorias() {
    const categorias = await fetch("http://localhost:8080/categoria");
    const data = await categorias.json();
    setCategorias(data);
  }

  async function retornarAutores() {
    const autores = await fetch("http://localhost:8080/autor/all");
    const data = await autores.json();
    console.log(data)
    setAutores(data);
  }

  async function carregarLivro(id: number) {
    const response = await fetch(`http://localhost:8080/livro/${id}`);
    const data = await response.json();
    
    const autoresIds = data.autores.map((autor: { id: number }) => autor.id);
    reset({
      nomeLivro: data.title,
      quantidadeEstoque: data.quantity_stock,
      preco: data.price,
      categoria: String(data.category.id),
      autores: autoresIds,
    });

    console.log(autoresIds)

    setValue("categoria", String(data.category.id));
    
  }

  useEffect(() => {
    retornarCategorias();
    retornarAutores();
  }, []);

  useEffect(() => {
    if (id) {
      setLivroId(Number(id));
      carregarLivro(Number(id));
    }
  }, [id]);

  async function onSubmit(data: FormData) {
    const metodo = livroId ? "PUT" : "POST";
    const url = livroId ? `http://localhost:8080/livro/${livroId}` : "http://localhost:8080/livro";
  
    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: data.nomeLivro,
        quantity_stock: data.quantidadeEstoque,
        price: data.preco,
        autores_ids: data.autores,
        category: data.categoria
      })
    });
  
    alert(livroId ? "Livro atualizado com sucesso!" : "Livro cadastrado com sucesso!");
    setLivroId(null); 
    reset({ 
      nomeLivro: "",
      quantidadeEstoque: 0,
      preco: 0,
      categoria: "",
      autores: [],
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="nomeLivro"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="quantidadeEstoque"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="preco"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700"
            >
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
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="autores"
              className="block text-sm font-medium text-gray-700"
            >
              Autores
            </label>
            <Controller
              control={control}
              name="autores"
              render={({ field }) => (
                <select
                  id="autores"
                  multiple
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => Number(option.value));
                    field.onChange(selectedOptions);
                  }}
                >
                  {autores.map((autor) => (
                    <option key={autor.id} value={autor.id}>
                      {autor.name}
                    </option>
                  ))}
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
