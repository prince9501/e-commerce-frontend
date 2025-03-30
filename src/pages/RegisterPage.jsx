import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      await register(values.name, values.email, values.password)
      toast.success('Registration successful')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <Field
              type="text"
              name="name"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterPage