import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface FormData {
  name: string;
}

export function CreateAuthor() {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar autenticado para cadastrar um autor.");
      navigate("/login");
      return;
    }

    await fetch("http://localhost:8080/autor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: data.name }),
    });

    alert("Autor cadastrado com sucesso!");
    reset({ name: "" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen my-10">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <a href="/" className="text-blue-500 hover:underline mb-4 block">
          Voltar
        </a>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome do Autor
            </label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <input
                  type="text"
                  id="nome"
                  placeholder="Nome do Autor"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar Autor
          </button>
        </form>
      </div>
    </div>
  );
}
