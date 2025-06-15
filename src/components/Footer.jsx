import React from "react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo or Site Name */}
        <div className="text-xl font-semibold text-[#1877F2]">
          Wamalwa's Store
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://wa.me/+254792129479"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://t.me/+254792129479"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaTelegramPlane size={20} />
          </a>
          <a
            href="https://linkedin.com/in/abiud-wamalwa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://x.com/_abiu_d"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://instagram.com/_abiu_d"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Wamalwa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
