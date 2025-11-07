import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 flex flex-col">
      <Navbar2 />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
          <div className="bg-[#1e293b] p-6 rounded-xl shadow">
            <p className="text-gray-400">
              This is your main dashboard overview.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
