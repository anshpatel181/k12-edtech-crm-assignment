import { useState } from "react"
import { formValidationSchema } from "../component/ZodValidation"
import toast from "react-hot-toast"
import { Navbar } from "../component/Navbar"

export const InquiryForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    user_type: "",
    category: "",
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSetInput = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      setIsLoading(true)

      const result = formValidationSchema.safeParse(formData)

      if (!result.success) {
        console.log(result.error.issues[0].message)

        return toast.error(result.error.issues[0].message)
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/inquiry/storeInquiry', {
        method: 'post',
        credentials: "include",
        body: JSON.stringify(result.data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      if (!response.ok) {
        return toast.error(data.message || "Unable to submit inquiry, please try again later.")
      }

      toast.success(data.message)
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        user_type: "",
        category: "",
        message: "",
      })
    } catch (error) {
      console.error(error)
      toast.error("Something Went Wrong on our side, please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-2">

          {/* Left side */}
          <div>
            <span className="inline-block rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold tracking-wider text-indigo-700">
              YOUR EDUCATION PARTNER
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Your Future Starts With the
              <span className="mt-2 block text-indigo-600">
                Right Guidance.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              Have questions about admissions, scholarships, educational
              events, or academic opportunities? Connect with our team
              and get the guidance you need.
            </p>

            <a
              href="#inquiry"
              className="mt-8 inline-block rounded-lg bg-indigo-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Submit an Inquiry
            </a>

            <div className="mt-14 grid grid-cols-3 gap-5">
              <div>
                <h3 className="font-bold text-blue-900">Admissions</h3>
                <p className="mt-2 text-xs text-slate-500">Explore opportunities</p>
              </div>

              <div>
                <h3 className="font-bold text-blue-900">Scholarships</h3>
                <p className="mt-2 text-xs text-slate-500">Discover support</p>
              </div>

              <div>
                <h3 className="font-bold text-blue-900">Events</h3>
                <p className="mt-2 text-xs text-slate-500">Stay connected</p>
              </div>
            </div>
          </div>

          {/* right side (form) */}
          <div
            id="inquiry"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Send Us an Inquiry
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below and our team will get back to you.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={formData.name}
                  onChange={handleSetInput}
                  maxLength={50}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    value={formData.email}
                    onChange={handleSetInput}
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="phone_number" className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    value={formData.phone_number}
                    onChange={handleSetInput}
                    minLength={7}
                    maxLength={15}
                    pattern="[0-9]{7,15}"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="user_type" className="mb-2 block text-sm font-semibold text-slate-700">
                    I Am a *
                  </label>
                  <select
                    id="user_type"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    value={formData.user_type}
                    onChange={handleSetInput}
                    name="user_type"
                    required
                  >
                    <option value="" disabled>Select user type</option>
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="School">School</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">
                    Inquiry Category *
                  </label>
                  <select
                    id="category"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    value={formData.category}
                    onChange={handleSetInput}
                    name="category"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Concert">Concert</option>
                    <option value="Admission">Admission</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  name="message"
                  id="message"
                  placeholder="Tell us how we can help you..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  minLength={1}
                  maxLength={1500}
                  required
                  value={formData.message}
                  onChange={handleSetInput}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Inquiry"}
              </button>

              <p className="text-center text-xs text-slate-400">
                Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>

        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:px-12">
          <p>© 2026 EduConnect. All rights reserved.</p>
          <p>Empowering education through better connections.</p>
        </div>
      </footer>

    </div>
  )
}
