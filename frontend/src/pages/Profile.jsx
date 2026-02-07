import { useState, useEffect } from "react";
import { User, Lock, AlertTriangle, Save, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword, deleteAccount } from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [name, setName] = useState(user?.name || "");
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [deleteData, setDeleteData] = useState({
        password: "",
        confirmText: "",
    });

    useEffect(() => {
        if (user) setName(user.name);
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await updateProfile({ name });
            // Update local user context if possible, otherwise just show success
            // Ideally update context, but for now just success message
            // Assuming api returns updated user

            // We can manually update the user object in local storage and context if we wanted to be perfect,
            // but simpler is just to rely on next fetch or re-login. 
            // Actually, let's try to update auth context if we can access it, or just force a reload/re-fetch.
            // Since context doesn't expose a 'updateUser' method, we might just re-login with current token?
            // Or just ignore context update for now.

            setMessage({ type: "success", text: "Profile updated successfully" });
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setMessage({ type: "error", text: "New passwords do not match" });
        }
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });
            setMessage({ type: "success", text: "Password changed successfully" });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (deleteData.confirmText !== "DELETE") {
            return setMessage({ type: "error", text: "Please type DELETE to confirm" });
        }

        if (!window.confirm("Are you absolutely sure? This cannot be undone.")) return;

        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await deleteAccount({ password: deleteData.password });
            logout();
            navigate("/");
        } catch (err) {
            setMessage({ type: "error", text: err.message });
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {message.text}
                </div>
            )}

            {/* Profile Details */}
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-gray-700/50 mb-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User size={20} className="text-amber-400" />
                    Personal Information
                </h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="w-full p-3 rounded-xl bg-[#0f172a]/50 border border-gray-700 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition flex items-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Update Profile
                    </button>
                </form>
            </div>

            {/* Change Password */}
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-gray-700/50 mb-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-blue-400" />
                    Change Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                className="w-full p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-blue-500 focus:outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="w-full p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-blue-500 focus:outline-none transition"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                        Change Password
                    </button>
                </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-900/10 rounded-2xl p-6 border border-red-500/20">
                <h2 className="text-xl font-semibold text-red-500 mb-2 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Danger Zone
                </h2>
                <p className="text-red-400/70 text-sm mb-6">
                    Permanently delete your account and all associated data. This action is irreversible.
                </p>

                <form onSubmit={handleDeleteAccount} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-red-300 mb-1">Enter your password to confirm</label>
                        <input
                            type="password"
                            value={deleteData.password}
                            onChange={(e) => setDeleteData({ ...deleteData, password: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#0f172a] border border-red-900/50 text-red-200 placeholder-red-900/50 focus:border-red-500 focus:outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-red-300 mb-1">Type "DELETE" to confirm</label>
                        <input
                            type="text"
                            value={deleteData.confirmText}
                            onChange={(e) => setDeleteData({ ...deleteData, confirmText: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#0f172a] border border-red-900/50 text-red-200 placeholder-red-900/50 focus:border-red-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || deleteData.confirmText !== "DELETE"}
                        className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                        Delete Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
