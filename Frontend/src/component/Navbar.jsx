import { Link } from 'react-router'

export const Navbar = () => {
    return (
        <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">

                <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-900">
                    EduConnect<span className="text-indigo-600">.</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="hidden text-sm font-medium text-indigo-600 sm:block">
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                        Admin Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}
