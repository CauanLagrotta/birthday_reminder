import { api } from "../api";
import registerIllustration from "/assets/register_illustration.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmitRegister = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    api
      .post("/users", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso!", {
          position: "bottom-left",
        });
        resetForm();
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro ao fazer registro. Tente novamente mais tarde";

        toast.error(errorMsg, {
          position: "bottom-left",
        });
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex bg-[#f2f2f2]">
      <div className="hidden sm:flex sm:w-[50%] mb-8 sm:mb-0 w-1/2 justify-center items-center bg-gray-100">
        <img
          className="w-full h-full object-cover sm:w-full"
          src={registerIllustration}
          alt="Imagem da tela de login"
        />
      </div>

      <div className="w-[90%] sm:w-[50%] max-w-3xl flex flex-col justify-center items-center bg-[#f2f2f2] p-8">
        <div className="w-full px-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-blue-500 mb-6">Register</h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitRegister}
          >
            {({ errors, touched }) => (
              <Form className="w-full max-w-md space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Nome
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Digite seu nome..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
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

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-600"
                    >
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-sm"
                    >
                      {React.createElement(
                        showPassword ? VisibilityOff : Visibility
                      )}
                    </button>
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

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-600"
                    >
                      Confirme a Senha
                    </label>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-sm"
                    >
                      {React.createElement(
                        showConfirmPassword ? VisibilityOff : Visibility
                      )}
                    </button>
                  </div>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirme sua senha..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Registrar-se
                </button>

                <div className="text-sm text-center mt-4 text-blue-600">
                  <Link to="/login" className="hover:underline">
                    Já tem uma conta? Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
