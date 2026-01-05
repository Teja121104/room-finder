import { useState } from "react";
import { supabase } from "../supabase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) setMessage(error.message);
    else {
      setMessage("✨ Check your email for the magic link!");
      // Simulate login for demo purposes
      setTimeout(() => onLogin(email), 1500); // automatically set user after a short delay
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-4 animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
          Welcome to Room Finder
        </h1>

        {/* Logo Circle */}
        <div className="mx-auto w-28 h-28 mb-6 rounded-full bg-white shadow-lg flex items-center justify-center animate-bounce">
          <img
            src="https://i.ibb.co/Xr7b8yPQ/images.png"
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner transition"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {message && (
          <p className="mt-4 text-center text-green-700 font-medium animate-pulse">
            {message}
          </p>
        )}

        {/* Thank You Animation */}
        {message && (
          <div className="mt-6 text-center text-purple-700 font-bold animate-fadeInUp">
            🎉 Thank you! You are one step away from logging in!
          </div>
        )}
      </div>
    </div>
  );
}
