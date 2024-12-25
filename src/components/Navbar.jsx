import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase/config";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          WeatherApp
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/forecast" className="hover:text-blue-200">
            Forecast
          </Link>
          <Link to="/saved-locations" className="hover:text-blue-200">
            Saved Locations
          </Link>
          {user ? (
            <button
              onClick={() => auth.signOut()}
              className="hover:text-blue-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
