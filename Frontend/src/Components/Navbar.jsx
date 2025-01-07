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
          src= "data:image/png;base64,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"
          className="h-[3rem] w-40 ml-3"
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
