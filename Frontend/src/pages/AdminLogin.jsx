import toast from "react-hot-toast"
import { Navbar } from "../component/Navbar"
import { useState } from "react"
import { useNavigate } from "react-router"

export const AdminLogin = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      setIsLoading(true)
      if (!data.email.trim() || !data.password) {
        return toast.error("All the fields are required. Please provide all the fields")
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        return toast.error(result.message || "Please provide valid credentials.")
      }

      toast.success(result.message || "You have logged in successfully")
      navigate("/dashboard", { replace: true, })
      setData({
        email: "",
        password: "",
      })
    } catch (error) {
      console.error(error)
      toast.error("Something Went Wrong on our side, please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">

      {/* Navbar */}
      <Navbar />

      {/* Main section */}
      <main className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Welcome back! Please enter your credentials to
              access the admin dashboard.
            </p>
          </div>

          {/* form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                  value={data.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                  value={data.password}
                  onChange={handleInput}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

            </form>
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            © 2026 EduConnect. All rights reserved.
          </p>

        </div>
      </main>

    </div>
  )
}
