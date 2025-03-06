import { Header } from "../components/header";
import { api } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

export function Profile() {
  const [values, setValues] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/profile");
      setValues(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  const handleEdit = async () => {
    if (values) {
      try {
        await api.put(`/users/${values.id}`, {
          name: values.name,
          email: values.email,
        });
        navigate("/birthday-register");
      } catch (error) {
        console.error("Erro ao atualizar os dados do usuário:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) =>
      prevValues ? { ...prevValues, [name]: value } : prevValues
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-[#f2f2f2] min-h-screen">
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Perfil</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome
          </label>
          <input
            type="text"
            name="name"
            value={values?.name || ""}
            onChange={handleChange}
            placeholder="Digite seu nome..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values?.email || ""}
            onChange={handleChange}
            placeholder="Digite seu email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleEdit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
