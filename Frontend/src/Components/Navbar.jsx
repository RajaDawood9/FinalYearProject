import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userName = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true); // User is logged in
      setUsername(userName);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token on logout
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="flex items-center justify-between shadow-xl w-full z-[999] sticky top-0 left-0 right-0 bg-white">
      <div className="rounded-lg">
        <img
          src="src/assets/logo.png"
          className="h-[3rem] w-30 ml-3"
          alt="Logo"
        />
      </div>
      <nav>
        <ul className="flex items-center gap-7 my-4 justify-between hover:text-textColor font-medium">
          <li>
            <NavLink to="/" className="text-textColor hover:text-primaryColor">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-textColor hover:text-primaryColor"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-textColor hover:text-primaryColor"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>

      {!isLoggedIn ? (
        <NavLink to="/login" className="text-textColor text-lg">
          <button className="rounded-md w-20 h-10 font-medium bg-green-600 hover:bg-green-700 mr-4">
            Login
          </button>
        </NavLink>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-medium text-lg text-textColor">{`Hello, ${username}`}</span>
          <button
            onClick={handleLogout}
            className="rounded-md w-20 h-10 font-medium  text-white bg-green-600 hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
