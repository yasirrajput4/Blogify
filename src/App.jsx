import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

/**
 * App — auth bootstrap (getCurrentUser → dispatch login/logout) is
 * identical. Changes:
 *   1. Removed the stray "TODO: " text before <Outlet /> — it was
 *      rendering literally on every page.
 *   2. Loading state now shows a centered spinner instead of returning
 *      null (blank white flash on every hard refresh).
 *   3. Background updated to `bg-paper` to match the editorial palette.
 *   4. Added `dispatch` to the useEffect dependency array (was already
 *      in the original as a comment; made it explicit).
 */
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        {/* Minimal ink-colored spinner — no extra dependencies */}
        <div className="w-6 h-6 rounded-full border-2 border-rule border-t-ink animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
