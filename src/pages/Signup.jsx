import React from "react";
import { Signup as SignupComponent } from "../components/Signup";

// Signup page — same thin wrapper as Login page. Matched vertical centering
// so the card sits in the optical middle of the viewport.
function Signup() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center py-12 px-4">
      <SignupComponent />
    </div>
  );
}

export default Signup;
