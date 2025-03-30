import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import authService from '../api/authService'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (user) {
      setInitialValues({
        name: user.name,
        email: user.email,
      })
    }
  }, [user])

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })

  const handleSubmit = async (values) => {
    try {
      await authService.updateProfile(values, user.token)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  if (!user) {
    return <div>Please login to view your profile</div>
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
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
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </Form>
        )}
      </Formik>
      
      <button
        onClick={logout}
        className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}

export default ProfilePage