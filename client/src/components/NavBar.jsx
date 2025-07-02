// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="w-60 min-h-screen bg-indigo-600 text-white flex flex-col py-6 px-4 shadow-xl">
//       <h1 className="text-2xl font-bold mb-8">🧠 MindScope</h1>

//       <nav className="flex flex-col gap-4">
//         <NavLink
//           to="/journal"
//           className={({ isActive }) =>
//             isActive ? 'font-semibold text-yellow-300' : 'hover:text-yellow-200'
//           }
//         >
//           📓 Journal
//         </NavLink>
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             isActive ? 'font-semibold text-yellow-300' : 'hover:text-yellow-200'
//           }
//         >
//           📊 Dashboard
//         </NavLink>
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    

<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MindScope</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
         <NavLink
            to="/dashboard"
            
            className={({ isActive }) =>
              `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${
                isActive
                  ? 'text-white bg-red-700 md:text-red-700 md:dark:text-red-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red700 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
              }`
            }
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
         <NavLink
            to="/journal"
            end
            className={({ isActive }) =>
              `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${
                isActive
                  ? 'text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
              }`
            }
            aria-current="page"
          >
            Journal
          </NavLink>
        </li>
  
        <li>
          <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Logout
          </button>
        </li>

      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
