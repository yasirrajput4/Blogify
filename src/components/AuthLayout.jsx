import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Handle navigation side-effects based on authentication status
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication]);

  // If the authStatus is still being determined or doesn't match the requirement,
  // you can conditionally render a loader or the children directly without a state variable.
  // Note: Since authStatus is a boolean (true/false), we can check if it's ready.
  if (authStatus === undefined) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
