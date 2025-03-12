import { Header } from "../components/header";
import { api } from "../api";
import { useAuth } from "../hooks/context";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
      toast.error(
        "Erro ao buscar aniversariantes. Tente novamente mais tarde",
        {
          position: "top-right",
        }
      );
    }
  };

  const handleDeleteBirthday = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await api.delete(`/birthdays/${id}`, { withCredentials: true });
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
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

      <div className="min-h-screen flex flex-col items-center">
        <main className="w-full max-w-4xl px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Aniversariantes
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.length > 0 ? (
              birthdays.map((birthday) => (
                <div
                  key={birthday.id}
                  className="bg-[#51446F] shadow-md rounded-lg p-6 flex flex-col items-center justify-center transition-transform transform cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-[#fff]">
                    {birthday.birthday_person}
                  </h2>
                  <p className="text-[#fff] text-sm mt-2">
                    {String(birthday.day).padStart(2, "0")}/
                    {String(birthday.month).padStart(2, "0")}
                  </p>

                  <DeleteIcon
                    className="absolute top-2 right-2 cursor-pointer"
                    sx={{ color: "#ff0000" }}
                    onClick={() => handleDeleteBirthday(birthday.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">
                Nenhum aniversário encontrado.
              </p>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
