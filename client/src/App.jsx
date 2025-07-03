// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Login from './components/Login';
// import Register from './components/Register';
// import ProtectedRoute from './components/ProtectedRoute';
// import Journal from './pages/journal';
// import Dashboard from './pages/dashboard';
// import Navbar from './components/NavBar';

// const displayNavber = (path) => {
//   return path === '/journal' || path === '/dashboard';
// };



// function App() {
//   const currentPath = window.location.pathname;
//   return (
//     <Router>
//       <AuthProvider>
//         {displayNavber(currentPath) && <Navbar />}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/"
//             element={<Navigate to="/journal" replace />}
//           />

//           <Route
//             path="/journal"
//             element={
//               <ProtectedRoute>

//                   <Journal />

//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>

//                   <Dashboard />
               
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Journal from './pages/journal';
import Dashboard from './pages/dashboard';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Don't show navbar on these paths
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
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
    </>
  );
}

export default App;