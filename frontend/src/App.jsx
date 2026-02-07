import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Opportunities from './pages/Opportunities';
import Skillboard from './pages/Skillboard';
import Resources from './pages/Resources';
import Notes from './pages/Notes';
import Resumes from './pages/Resumes';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedLayout from './components/layout/ProtectedLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/skillboard" element={<Skillboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
