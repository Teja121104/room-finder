import { useState } from "react";
import { supabase } from "../supabase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("We’ve sent a secure login link to your email.");
      setTimeout(() => onLogin({ email }), 1500);
    }
  };

  return (
    <div className="login-bg">
      {/* Animated grid background */}
      <div className="grid-bg">
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i} className="grid-tile" />
        ))}
      </div>

      {/* Login Card */}
      <div className="login-card animate-fadeIn">
        <div className="logo-wrapper">
          <img
            src="https://i.ibb.co/Xr7b8yPQ/images.png"
            alt="Room Finder Logo"
          />
        </div>

        <h1 className="title">Room Finder</h1>
        <p className="subtitle">Securely find and manage rooms with ease</p>

        <div className="divider" />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Sending secure link..." : "Send Magic Link"}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="footer-text">🔒 Password-less & secure authentication</p>
      </div>
    </div>
  );
}
