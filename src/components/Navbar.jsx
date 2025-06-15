import React from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-md z-50 border-b border-blue-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center"
        >
          Wamalwa Stores
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/contact"
            className="text-gray-300 hover:text-blue-400 transition duration-200"
          >
            Contact Us
          </Link>

          <Link
            to="/faqs"
            className="text-gray-300 hover:text-blue-400 transition duration-200"
          >
            FAQs
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-emerald-400 flex items-center transition duration-200"
            >
              <ShoppingCart size={20} className="mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-emerald-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center text-white bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded-md text-sm font-medium transition"
            >
              <Lock size={18} className="mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm transition"
              >
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="flex items-center bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm transition"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
