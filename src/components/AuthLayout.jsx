import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
