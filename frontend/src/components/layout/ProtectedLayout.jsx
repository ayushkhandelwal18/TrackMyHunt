import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

function ProtectedLayout() {
    const { isAuthenticated, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-amber-500">Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />;

    return (
        <div className="flex min-h-screen bg-[#020617] text-gray-100 font-poppins relative">

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed top-4 right-4 z-40 bg-amber-500 text-black p-2 rounded-lg shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar - Fixed width */}
            
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            
            <div className="flex-1 md:ml-64 p-8 overflow-y-auto w-full transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ProtectedLayout;
