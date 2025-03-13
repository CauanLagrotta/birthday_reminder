import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("O email é obrigatório"),
});

export function ForgotPassword() {
  const handleForgotPassword = async (email: string) => {
    api.post("/auth/forgot-password", { email }).then(() => {
      toast.success("Email enviado com sucesso!", {
        position: "bottom-left",
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Recuperar Senha
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Digite seu e-mail para receber um link de recuperação de senha.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleForgotPassword(values.email);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 mb-1">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition $ {
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Enviar E-mail
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
}
