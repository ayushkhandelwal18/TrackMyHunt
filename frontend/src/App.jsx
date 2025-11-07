import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/Sidebar";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Opportunities from "./pages/Opportunities";
import Skillboard from "./pages/Skillboard";
import Resources from "./pages/Resources";
import Notes from "./pages/Notes";


function LayoutWithSidebar({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar2 />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing and Auth */}
        <Route path="/" element={<><Navbar /><h1 className="text-white text-center mt-20">Home Page</h1></>} />
        <Route path="/authform" element={<AuthForm />} />

        {/* Dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <LayoutWithSidebar>
              <Dashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/applications"
          element={
            <LayoutWithSidebar>
              <Applications />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/opportunities"
          element={
            <LayoutWithSidebar>
              <Opportunities />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/skillboard"
          element={
            <LayoutWithSidebar>
              <Skillboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/resources"
          element={
            <LayoutWithSidebar>
              <Resources />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/notes"
          element={
            <LayoutWithSidebar>
              <Notes />
            </LayoutWithSidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
