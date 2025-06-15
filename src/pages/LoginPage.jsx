import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, loading } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);

        // Redirect only if login was successful
        if (useUserStore.getState().user) {
            navigate("/"); // Redirect to homepage or any protected page
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-screen bg-gray-900 py-12 sm:px-6 lg:px-8">
            <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-400">
                    Welcome back
                </h2>
            </motion.div>

            <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="********"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Log in
                                </>
                            )}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-400 hover:text-blue-300"
                        >
                            sign up here <ArrowLeft className="inline h-4 w-4" />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
