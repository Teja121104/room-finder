// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { supabase } from "./supabase";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser({ email: data.session.user.email });
      }
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) setUser({ email: session.user.email });
        else setUser(null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return user ? (
    <Home user={user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={(user) => setUser(user)} />
  );
}
