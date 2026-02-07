import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

function ProtectedLayout() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-amber-500">Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />;

    return (
        <div className="flex min-h-screen bg-[#020617] text-gray-100 font-poppins">
            {/* Sidebar - Fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ProtectedLayout;
