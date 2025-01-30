import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "../context/SellerContext";

const Login = ({ setToken }) => {
  const { setSellerId } = useContext(ShopContext); // Make sure this matches the context

  const [isLogin, setIsLogin] = useState(true);
  const [sellerId, setSellerIdInput] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/seller/login", {
        sellerId,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        console.log(sellerId)
        setSellerId(sellerId); // This correctly updates the sellerId in the context
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to login. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/seller/signup", {
        name,
        email,
        sellerId,
        password,
      });

      if (response.data.success) {
        toast.success("Signup successful! Please log in.");
        setIsLogin(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        {isLogin ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Seller Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Seller ID
                </p>
                <input
                  onChange={(e) => setSellerIdInput(e.target.value)}
                  value={sellerId}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="text"
                  placeholder="Enter your Seller ID"
                  required
                />
              </div>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="text-sm mt-4 text-center">
              Don't have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Seller Signup</h1>
            <form onSubmit={handleSignup}>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Seller ID
                </p>
                <input
                  onChange={(e) => setSellerIdInput(e.target.value)}
                  value={sellerId}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="text"
                  placeholder="Create your Seller ID"
                  required
                />
              </div>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="password"
                  placeholder="Create your password"
                  required
                />
              </div>
              <button
                className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
