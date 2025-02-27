import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { api } from "../api";
import loginIllustration from "/assets/login_illustration.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitLogin = async (
    values: {
      email: string;
      password: string;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    api
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(() => {
        toast.success("Usuário logado com sucesso!", {
          position: "bottom-left",
        });
        resetForm();
        setTimeout(() => navigate("/home"), 1000);
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro ao fazer login. Tente novamente mais tarde";

        toast.error(errorMsg, {
          position: "bottom-left",
        });
      });
  };

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row items-center justify-center bg-gray-100">
      <div className="hidden sm:flex w-full sm:w-[50%] justify-center items-center mb-8 sm:mb-0">
        <img
          src={loginIllustration}
          alt="Imagem da tela de login"
          className="w-[80%] sm:w-full"
        />
      </div>

      <div className="w-[90%] sm:w-[50%] max-w-3xl flex flex-col justify-center items-center bg-[#f2f2f2] p-8">
        <div className="w-full px-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-blue-500 mb-6">Login</h1>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-full max-w-md space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>

                <div className="relative">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-600"
                    >
                      Senha:
                    </label>
                    <div
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </div>
                  </div>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite sua senha..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    to="/forgot-password"
                    className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
                  >
                    Esqueceu a senha?
                  </Link>

                  <Link
                    to="/register"
                    className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
                  >Registrar-se</Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Entrar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
