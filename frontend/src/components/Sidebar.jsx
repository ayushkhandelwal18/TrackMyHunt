import { useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, Calendar, Code, Link, StickyNote } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Applications", icon: <Briefcase size={20} />, path: "/applications" },
    { name: "Opportunities", icon: <Calendar size={20} />, path: "/opportunities" },
    { name: "Skillboard", icon: <Code size={20} />, path: "/skillboard" },
    { name: "Resources", icon: <Link size={20} />, path: "/resources" },
    { name: "Notes", icon: <StickyNote size={20} />, path: "/notes" },
  ];

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-gray-700/60 flex flex-col py-6 px-4 fixed h-full">
      <h2 className="text-xl font-semibold mb-8 text-amber-400 px-2">Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-[#334155] text-amber-400 shadow-sm"
                : "text-gray-300 hover:bg-[#2d3b53] hover:text-amber-300"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
