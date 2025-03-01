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
      console.log(error);
    }
  };

  const handleEdit = () => {
    if (values) {
      api
        .put(`/users/${values.id}`, {
          name: values.name,
          email: values.email,
        })
        .then(() => {
          setTimeout(() => navigate("/home"), 1000);
        });
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
    <div className="bg-[#f2f2f2] h-screen">
      <Header />

      <h1 className="text-3xl text-blue-500">Profile</h1>

      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nome
      </label>
      <input
        type="text"
        value={values?.name || ""}
        placeholder="Digite seu nome..."
        name="name"
        onChange={handleChange}
      />

      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        value={values?.email || ""}
        placeholder="Digite seu email..."
        name="email"
        onChange={handleChange}
      />

      <button onClick={handleEdit}>Salvar</button>
    </div>
  );
}
