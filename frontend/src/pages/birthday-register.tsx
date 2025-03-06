import { Header } from '../components/header'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { api } from '../api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../hooks/context'

const validationSchema = Yup.object().shape({
  person_name: Yup.string().required(
    'O nome do(a) aniversariante é obrigatório'
  ),
  day: Yup.number()
    .min(1, 'O dia deve estar entre 1 e 31')
    .max(31, 'O dia deve estar entre 1 e 31')
    .required('O dia do aniversariante é obrigatório'),
  month: Yup.number()
    .min(1, 'O mês deve estar entre 1 e 12')
    .max(12, 'O mês deve estar entre 1 e 12')
    .required('O mês do aniversariante é obrigatório'),
})

export function BirthdayRegister() {
  const { user } = useAuth()
  const handleAddBirthday = async (
    values: {
      person_name: string
      day: string
      month: string
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const date = `${values.day}/${values.month}`

      await api.post(
        `/birthdays/${user?.id}`,
        {
          birthday_person: values.person_name,
          date,
        },
        { withCredentials: true }
      )
      toast.success('Aniversariante cadastrado com sucesso!', {
        position: 'top-right',
      })
      resetForm()
    } catch (error) {
      toast.error(
        'Erro ao cadastrar aniversariante. Tente novamente mais tarde',
        {
          position: 'top-right',
        }
      )
    }
  }

  return (
    <div>
      <Header />

      <div className='bg-[#f2f2f2] min-h-screen flex flex-col items-center py-10'>
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
          <h2 className='text-xl font-semibold text-gray-700 text-center mb-4'>
            Cadastro de Aniversariante
          </h2>
          <Formik
            initialValues={{
              person_name: '',
              day: '',
              month: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddBirthday}
          >
            {({ errors, touched }) => (
              <Form className='space-y-4'>
                <div>
                  <label htmlFor='person_name' className='block text-gray-700'>
                    Nome do(a) aniversariante
                  </label>
                  <Field
                    type='text'
                    name='person_name'
                    placeholder='Nome do(a) aniversariante'
                    className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.person_name && touched.person_name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.person_name && touched.person_name && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.person_name}
                    </div>
                  )}
                </div>

                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <label htmlFor='day' className='block text-gray-700'>
                      Dia
                    </label>
                    <Field
                      type='number'
                      name='day'
                      maxLength={2}
                      placeholder='DD'
                      className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.day && touched.day
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.day && touched.day && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.day}
                      </div>
                    )}
                  </div>
                  <div className='w-1/2'>
                    <label htmlFor='month' className='block text-gray-700'>
                      Mês
                    </label>
                    <Field
                      type='number'
                      name='month'
                      maxLength={2}
                      placeholder='MM'
                      className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.month && touched.month
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.month && touched.month && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.month}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                >
                  Cadastrar Aniversário
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}