import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

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
