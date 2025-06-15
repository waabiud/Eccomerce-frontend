import React, { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";
import Footer from "./components/Footer.jsx"; //

import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useCartStore } from "./stores/useCartStore.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100 text-gray-900"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Sticky Navbar */}
      <div className="bg-[#1877F2] text-white shadow-md py-3 px-6 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="flex-grow pt-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      {/* Toast notifications */}
      <Toaster />

      {/* Footer appears on every page */}
      <Footer />
      <a
  href="https://wa.me/254792129479"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
  aria-label="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.875 7.875 0 008 .027 7.933 7.933 0 000 8c0 1.396.362 2.751 1.048 3.944L.01 16l4.161-1.08A7.937 7.937 0 008 16a7.93 7.93 0 005.656-2.344A7.93 7.93 0 0016 8c0-2.136-.833-4.142-2.399-5.674zm-5.59 11.973a6.59 6.59 0 01-3.36-.912l-.24-.14-2.47.64.66-2.41-.15-.25a6.582 6.582 0 01-.988-3.42 6.624 6.624 0 016.616-6.623A6.596 6.596 0 0114.615 8a6.594 6.594 0 01-6.604 6.599zm3.623-4.946c-.197-.098-1.172-.579-1.353-.645-.181-.067-.312-.098-.442.098s-.508.645-.623.778c-.114.13-.228.147-.425.049a5.38 5.38 0 01-1.59-.98 5.968 5.968 0 01-1.102-1.365c-.115-.197-.012-.303.086-.4.088-.087.196-.228.294-.342.098-.114.13-.196.196-.326.065-.13.033-.245-.016-.342-.049-.098-.442-1.067-.605-1.462-.159-.38-.322-.329-.442-.335l-.377-.007a.725.725 0 00-.526.245 2.216 2.216 0 00-.695 1.645c0 .97.701 1.905.798 2.038.098.13 1.382 2.15 3.35 3.013.469.202.836.323 1.12.414.471.15.899.129 1.237.078.378-.057 1.172-.478 1.338-.94.165-.463.165-.86.116-.94-.048-.079-.177-.13-.374-.228z" />
  </svg>
</a>

    </div>
  );
}

export default App;
