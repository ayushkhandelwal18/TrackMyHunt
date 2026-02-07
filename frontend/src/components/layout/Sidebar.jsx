import { Link, useLocation } from "react-router-dom";
import {
    Home,
    LayoutDashboard,
    Briefcase,
    Lightbulb,
    GraduationCap,
    BookOpen,
    NotebookPen,
    FileText,
    LogOut,
    User as UserIcon
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Applications", path: "/applications", icon: Briefcase },
        { name: "Opportunities", path: "/opportunities", icon: Lightbulb },
        { name: "Skillboard", path: "/skillboard", icon: GraduationCap },
        { name: "Resources", path: "/resources", icon: BookOpen },
        { name: "Resumes", path: "/resumes", icon: FileText },
        { name: "Notes", path: "/notes", icon: NotebookPen },
    ];

    // Separate profile for bottom or just add to list, user asked for "Sidebar (bottom)"
    // If we want it strictly at bottom, we can separate it. 
    // "Add a Profile section in the sidebar (bottom)"
    // I will add it to the menu items for now, as the sidebar implementation iterates over menuItems.
    // Or I can add a specific section for Profile below the main nav.
    // Let's add it to the list but maybe at the end or separate?
    // User said "in the sidebar (bottom)".
    // I will look at the Sidebar code again. It has a "Menu" section.
    // I'll add a separate section for "Account".


    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] text-gray-300 border-r border-gray-700/50 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-gray-700/50">
                <Link to="/dashboard" className="text-2xl font-bold tracking-wide text-gray-100 flex items-center gap-2">
                    TrackMy<span className="text-amber-400">Hunt</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <div className="pt-2 pb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Menu</div>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-amber-500/10 text-amber-400 font-semibold shadow-sm border border-amber-500/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-amber-400"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="pt-2 pb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Account</div>
                    <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === "/profile"
                            ? "bg-amber-500/10 text-amber-400 font-semibold shadow-sm border border-amber-500/20"
                            : "text-gray-400 hover:bg-gray-800 hover:text-amber-400"
                            }`}
                    >
                        <UserIcon size={20} />
                        <span className="font-medium">Profile</span>
                    </Link>
                </div>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700/50">
                <button
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200"
                    onClick={logout}
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
