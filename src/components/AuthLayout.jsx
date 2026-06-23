import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  // If authStatus is still being fetched or undefined, show loading screen
  if (authStatus === undefined) {
    return <h1>Loading...</h1>;
  }

  // Perform inline authentication checks during the render phase
  // instead of routing them through a useEffect hook
  if (authentication && authStatus !== authentication) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && authStatus !== authentication) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
