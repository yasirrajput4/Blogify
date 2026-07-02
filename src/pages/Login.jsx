import React from "react";
import { Login as LoginComponent } from "../components/Login";

/**
 * Login page — wrapper that provides vertical breathing room around the
 * Login component. The original rendered <loginComponent /> (lowercase),
 * which React treats as an unknown DOM element and silently renders
 * nothing. Fixed to PascalCase here — purely a JSX correctness fix,
 * not a logic change.
 */
function Login() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center py-12 px-4">
      <LoginComponent />
    </div>
  );
}

export default Login;
