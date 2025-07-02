// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Journal from './pages/journal';
import Dashboard from './pages/dashboard';
import Navbar from './components/NavBar';

const displayNavber = (path) => {
  return path === '/journal' || path === '/dashboard';
};



function App() {
  // This function checks if the current path requires the Navbar to be displayed
  const currentPath = window.location.pathname;
  return (
    <Router>
      <AuthProvider>
        {displayNavber(currentPath) && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={<Navigate to="/journal" replace />}
          />

          <Route
            path="/journal"
            element={
              <ProtectedRoute>

                  <Journal />

              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                  <Dashboard />
               
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
