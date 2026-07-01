import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

/**
 * LogoutBtn — referenced by Header but never provided in the upload.
 * Calls authService.logout() then dispatches the logout action, which
 * is the standard Appwrite + Redux pattern matching the login flow.
 * Added a brief `loading` state so the button doesn't feel frozen
 * during the async call.
 */
export default function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="
        px-3.5 py-2 text-sm font-medium rounded-md
        text-terracotta hover:text-ink hover:bg-rule/60
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
