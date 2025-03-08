import { Header } from "../components/header";
import { api } from "../api";
import { useAuth } from "../hooks/context";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    if (user?.id) {
      handleGetBirthdays();
    }
  }, [user?.id]);

  return (
    <div>
      <Header />

      {birthdays.length > 0 ? (
        birthdays.map((birthday) => (
          <div key={birthday.id}>
            <p>{birthday.birthday_person}</p>
            <p>
              {String(birthday.day).padStart(2, "0")}/
              {String(birthday.month).padStart(2, "0")}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum aniversário encontrado.</p>
      )}

      <ToastContainer />
    </div>
  );
}
