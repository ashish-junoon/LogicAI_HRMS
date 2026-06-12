import React, { useState } from 'react'
import illustration from '../assets/illustration.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import ErrorMsg from '../components/utils/ErrorMsg';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  //context
  const {login} = useAuth();
  // const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email Required"),
      password: Yup.string().required("Password Required"),
    }),
    onSubmit: async (values) => {
      const userData = {
        username: "Ravi",
        role: values.email === "ravim70655@gmail.com" ? "admin" : "employee"
      }
      login(userData);
      // navigate('/dashboard');
    }
  })

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Onboarding */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-gray-100 to-gray-200 flex-col items-center justify-center p-8">
        {/* Illustration Placeholder */}
        <div className="w-120 h-120 bg-white rounded-xl shadow-lg flex items-center justify-center">
          <img src={illustration} alt="illustration" />

        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3 max-w-sm -mt-6">
          Digital HRMS
        </h2>
        <p className="text-gray-600 text-center max-w-sm mb-8">
          Streamline your workforce management
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-pink-500 transform rotate-45"></div>
              <div className="w-6 h-6 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back !</h1>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          {/* Form */}
          <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...loginFormik.getFieldProps("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              {loginFormik.touched.email && loginFormik.errors.email ? (
                <ErrorMsg error={loginFormik.errors.email} />
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...loginFormik.getFieldProps("password")}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition pr-12"
                />
                {loginFormik.touched.password && loginFormik.errors.password ? (
                <ErrorMsg error={loginFormik.errors.password} />
              ) : null}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {/* {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )} */}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-pink-500 hover:text-pink-600 font-medium transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-6"
            >
              Login
              <span>→</span>
            </button>
          </form>

          {/* Terms & Links */}
          <p className="text-xs text-gray-600 text-center mt-6">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
              Privacy Policy
            </a>
          </p>

          {/* Sign Up Link */}
          {/* <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="#" className="text-pink-500 hover:text-pink-600 font-semibold">
              Sign Up
            </a>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Login