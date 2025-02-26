import { api } from "../api";
import bobSad from "/assets/bob_sad.png";
import bobHappy from "/assets/bob_happy.png";
import bobNeutral from "/assets/bob_neutral.png";
import { useState } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export function ProveYoureHuman() {
  const [bobImg, setBobImg] = useState(bobNeutral);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitPraise = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("userResponse") as HTMLInputElement;
    const user_response = input.value;

    try {
      const response = await api.post("/prove-youre-human", { user_response });
      const result = response.data.result;

      if (result === "INSULTO") {
        setBobImg(bobSad);
        setMessage("Bob está muito triste com sua resposta. 😢");
      } else if (result === "ELOGIO") {
        setBobImg(bobHappy);
        setMessage("Bob gostou da sua resposta. 😊");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setBobImg(bobNeutral);
        setMessage("Bob ficou confuso com sua resposta. 😕");
      }
    } catch (error) {
      console.error("Erro ao enviar a resposta:", error);
      setMessage("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <Box className="flex items-center justify-center h-full">
          <CircularProgress />
        </Box>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <button
            className="absolute top-4 left-4 text-blue-500 hover:underline"
            onClick={() => navigate("/home")}
          >
            Pular esta etapa
          </button>
          <h1 className="text-2xl sm:text-3xl text-center mb-4">
            Prove que você é humano fazendo um elogio ao
            <span className="text-blue-600"> Bob</span>
          </h1>
          <img
            src={bobImg}
            alt="Reação do Bob"
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-4"
          />
          <form
            onSubmit={handleSubmitPraise}
            className="flex flex-col items-center space-y-4"
          >
            <input
              type="text"
              name="userResponse"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Enviar
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
