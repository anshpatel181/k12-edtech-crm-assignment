
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../component/Navbar";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/inquiry/dashboard`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch dashboard data.");
      }

      setDashboardData(Array.isArray(data.data) ? data.data : []);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Search and filter inquiries
  const filteredInquiries = useMemo(() => {
    return dashboardData.filter((inquiry) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch = !searchValue || inquiry.name?.toLowerCase().includes(searchValue) || String(inquiry.phone_number || "").includes(searchValue);

      const matchesCategory =
        !category || inquiry.category === category;

      const matchesUserType =
        !userType || inquiry.user_type === userType;

      return matchesSearch && matchesCategory && matchesUserType;
    });
  }, [dashboardData, search, category, userType]);

  // Calculate statistics dynamically
  const stats = [
    {
      title: "Total Inquiries",
      value: dashboardData.length,
      description: "All received inquiries",
      icon: "📋",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Pending",
      value: dashboardData.filter(
        (item) => item.status?.toLowerCase() === "pending"
      ).length,
      description: "Awaiting follow-up",
      icon: "⏳",
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Contacted",
      value: dashboardData.filter(
        (item) => item.status?.toLowerCase() === "contacted"
      ).length,
      description: "Already contacted",
      icon: "📞",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Resolved",
      value: dashboardData.filter(
        (item) => item.status?.toLowerCase() === "resolved"
      ).length,
      description: "Successfully completed",
      icon: "✓",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status styling
  const statusStyles = {
    pending: "bg-amber-50 text-amber-700",
    contacted: "bg-blue-50 text-blue-700",
    resolved: "bg-emerald-50 text-emerald-700",
  };

  // Logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to logout.");
      }

      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12">

        {/* Dashboard Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and track all incoming inquiries from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs text-slate-500">Welcome back</p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}

        </section>

        {/* Inquiry Management */}
        <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col justify-between gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Inquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage submitted inquiries.
              </p>
            </div>

          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or phone number..."
                className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Concert">Concert</option>
              <option value="Admission">Admission</option>
              <option value="General Query">General Query</option>
            </select>

            {/* User Type Filter */}
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500"
            >
              <option value="">All User Types</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
              <option value="School">School</option>
            </select>

          </div>

          {/* Inquiry Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-250 text-left">

              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    User Type
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-sm text-slate-500">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <p className="font-semibold text-slate-700">
                        No inquiries found
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                        {inquiry.name}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {inquiry.phone_number}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {inquiry.email}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {inquiry.user_type}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {inquiry.category}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500">
                        {formatDate(inquiry.created_at)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            statusStyles[inquiry.status?.toLowerCase()] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-7 text-sm text-slate-500 md:flex-row md:px-12">
          <p>© 2026 EduConnect. All rights reserved.</p>
          <p>Admin Dashboard</p>
        </div>
      </footer>

    </div>
  );
};
