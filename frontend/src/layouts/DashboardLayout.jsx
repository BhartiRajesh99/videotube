import { Outlet, useNavigate, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Content", path: "/dashboard/content" },
    { name: "Playlists", path: "/dashboard/playlists" },
    { name: "Analytics", path: "/dashboard/analytics" },
    { name: "Revenue", path: "/dashboard/revenue" },
    { name: "Settings", path: "/dashboard/settings" },
  ];
  return (
    <div className="flex pt-16">
      {/* SIDEBAR */}
      <aside className="hidden mt-2 w-40 flex-col border-r border-r-sky-300/50 bg-white/70 backdrop-blur-xl lg:flex">
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
               end={item.path === "/dashboard"} 
              className={({ isActive }) =>
                `cursor-pointer border-b border-b-slate-200 px-4 py-2 transition ${isActive ? "border-l-4 border-l-sky-500 bg-sky-100 font-semibold text-sky-600" :  "text-slate-600"} hover:bg-sky-100 hover:text-sky-600`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
