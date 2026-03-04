import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNav } from "../hooks/useNav";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { scrolled, progress } = useNav();
  const [open, setOpen] = useState(false);

  console.log(user);

  const handleMenuClick = async (l) => {
    if (l === "Logout") {
      await logout();
      navigate("/");
    } else {
      navigate(l === "Home" ? "/" : `/${l.toLowerCase()}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 border-b border-sky-200/60 transition-all duration-400 ${scrolled ? "bg-white/80 shadow-lg shadow-sky-100/50 backdrop-blur-2xl" : "bg-transparent"}`}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-linear-to-r from-sky-400 via-blue-500 to-sky-400 transition-all duration-800 ease-in-out"
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="relative h-9 w-12 rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-sky-400 to-blue-400 opacity-50 blur-sm" />
            <div className="relative border-2 border-off-white/75 flex h-9 w-12 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-blue-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <span className="hidden text-xl font-black tracking-tight text-gray-900 sm:block">
            Video
            <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Tube
            </span>
          </span>
        </div>

        {/* Search */}
        <div className="hidden max-w-md flex-1 lg:flex lg:items-center lg:justify-center">
          <div className="relative w-full">
            <svg
              className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-sky-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search videos, creators, topics..."
              className="font-dm-sans h-full w-full rounded-full border border-sky-200 bg-sky-50/40 py-2 pr-5 pl-11 text-sm text-gray-700 placeholder-sky-300 transition-all duration-300 outline-none hover:border-sky-300 hover:bg-sky-100 focus:border-sky-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
            />
          </div>
        </div>

        {/* Nav links + actions */}
        <div className="flex items-center gap-1">
          {user && (
            <nav className="hidden items-center md:flex">
              {["Home", "Playlist", "Subscriptions", "Dashboard"].map((l) => (
                <NavLink
                  to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                  key={l}
                  className={({ isActive }) =>
                    `font-dm-sans ${isActive ? "text-black" : "text-gray-500"} rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-sky-50 hover:text-gray-900`
                  }
                >
                  {l}
                </NavLink>
              ))}
            </nav>
          )}
          <div className="ml-2 flex items-center gap-2">
            {!user ? (
              <>
                <NavLink
                  to={"/login"}
                  className="font-dm-sans hidden cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 md:block"
                >
                  Sign in
                </NavLink>
                <button className="group font-dm-sans relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-101 hover:bg-neutral-800 hover:shadow-sm hover:shadow-gray-900/20">
                  <span>Get Started</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/"}
                  onClick={handleLogout}
                  className="font-dm-sans hidden cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 md:block"
                >
                  Logout
                </NavLink>
              </>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer rounded-lg p-2 text-gray-500 transition-all hover:bg-sky-50 hover:text-gray-900 md:hidden"
            >
              <div className="w-5 space-y-1.5">
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-72 border-t border-sky-100" : "max-h-0"}`}
      >
        {user ? (
          <div className="space-y-1 bg-white/95 px-6 py-4 backdrop-blur-xl">
            {["Home", "Playlist", "Subscriptions", "Dashboard", "Logout"].map(
              (l) => (
                <button
                  key={l}
                  onClick={() => handleMenuClick(l)}
                  className="font-dm-sans w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-600 transition-all hover:bg-sky-50 hover:text-gray-900"
                >
                  {l}
                </button>
              ),
            )}
          </div>
        ) : (
          <div className="space-y-1 bg-white/95 px-6 py-4 backdrop-blur-xl">
            <NavLink
              to={"/login"}
              className="font-dm-sans block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-600 transition-all hover:bg-sky-50 hover:text-gray-900"
            >
              Sign in
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
