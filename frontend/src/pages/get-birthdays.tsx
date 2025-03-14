import { Header } from "../components/header";
import { api } from "../api";
import { useAuth } from "../hooks/context";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

interface IBirthday {
  id: number;
  user: {
    id: string;
  };
  birthday_person: string;
  day: number;
  month: number;
}

export function GetBirthdays() {
  const { user } = useAuth();
  const [birthdays, setBirthdays] = useState<IBirthday[]>([]);

  const handleGetBirthdays = async () => {
    try {
      const response = await api.get(`/birthdays/${user?.id}`, {
        withCredentials: true,
      });
      setBirthdays(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBirthday = async (id: number) => {
    const result = await Swal.fire({
      title: "Tem certeza que quer deletar?",
      text: "Não será possivel reverter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero deletar!",
    });
    if (result.isConfirmed) {
      await api.delete(`/birthdays/${id}`, { withCredentials: true });
      await Swal.fire({
        title: "Deletado!",
        text: "O aniversariante foi deletado.",
        icon: "success",
      });

      await handleGetBirthdays();
    }
  };

  useEffect(() => {
    if (user?.id) {
      handleGetBirthdays();
    }
  }, [user?.id]);

  return (
    <div>
      <Header />

      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <main className="w-full max-w-4xl px-6 py-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            🎉 Aniversariantes
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.length > 0 ? (
              birthdays.map((birthday) => (
                <div
                  key={birthday.id}
                  className="relative bg-[#6B5B95] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {birthday.birthday_person}
                  </h2>
                  <p className="text-white text-sm mt-2">
                    {String(birthday.day).padStart(2, "0")}/
                    {String(birthday.month).padStart(2, "0")}
                  </p>

                  <button
                    className="absolute top-2 right-2 bg-red-600 p-1 rounded-full hover:bg-red-700 transition"
                    onClick={() => handleDeleteBirthday(birthday.id)}
                  >
                    <DeleteIcon sx={{ color: "#fff" }} className="cursor-pointer"/>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">
                Nenhum aniversário encontrado. 🧐
              </p>
            )}
          </div>
        </main>
        <ToastContainer />
      </div>
    </div>
  );
}
