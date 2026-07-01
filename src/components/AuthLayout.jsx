import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * AuthLayout (Protected)
 * Route guard that checks Redux auth status before rendering children.
 *
 * FIX: The original checked `authStatus === undefined` as a loading
 * condition, but Redux initialState has `status: false` — it is never
 * undefined. That branch was dead code and could never show. Removed.
 *
 * The real loading moment is handled in App.jsx (the Appwrite session
 * check), which renders null/pulse until complete before mounting any
 * routes — so by the time AuthLayout runs, authStatus is always a real
 * boolean. The guard logic itself (authentication prop vs authStatus)
 * is unchanged.
 */
export default function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  // Authenticated route but user is not logged in → send to login
  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // Guest-only route (login/signup) but user IS logged in → send home
  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
