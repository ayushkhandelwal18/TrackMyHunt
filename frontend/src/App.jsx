import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Opportunities from './pages/Opportunities';
import Skillboard from './pages/Skillboard';
import Resources from './pages/Resources';
import Notes from './pages/Notes';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/skillboard" element={<Skillboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  )
}

export default App
