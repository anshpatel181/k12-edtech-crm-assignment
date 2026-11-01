import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router"
import { InquiryForm } from './pages/InquiryForm'
import { AdminLogin } from './pages/AdminLogin'
import { Dashboard } from './pages/Dashboard'
import { Toaster } from "react-hot-toast"

const Route = createBrowserRouter([
  {
    path: "/",
    element: <InquiryForm />
  },

  {
    path: "/login",
    element: <AdminLogin />
  },

  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={Route}></RouterProvider>
      <Toaster />
    </>
  )
}

export default App
