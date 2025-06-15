import React from "react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (formerly Twitter)

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1877F2]">
          Contact Us
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Have questions or need help? Fill out the form below and we’ll get back to you shortly.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Wamalwa"
              className="w-full border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="wamalwa@gmail.com"
              className="w-full border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Message</label>
            <textarea
              rows="5"
              required
              placeholder="Write your message..."
              className="w-full border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-gray-900 text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1877F2] hover:bg-[#155FC2] text-white font-semibold py-3 rounded-lg shadow transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">
            Or reach us on
          </h2>
          <div className="flex justify-center space-x-5 text-white">
            <a
              href="https://wa.me/+254792129479"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-3 rounded-full hover:scale-110 transition"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://t.me/+254792129479"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 p-3 rounded-full hover:scale-110 transition"
            >
              <FaTelegramPlane size={24} />
            </a>
            <a
              href="https://linkedin.com/in/abiud-wamalwa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 p-3 rounded-full hover:scale-110 transition"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href="https://x.com/_abiu_d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black p-3 rounded-full hover:scale-110 transition"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://instagram.com/_abiu_d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-3 rounded-full hover:scale-110 transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
