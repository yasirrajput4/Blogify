import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

/**
 * Login — auth flow (authService.login, getCurrentUser, dispatch, navigate)
 * is byte-for-byte the same. Only presentation changed: a centered
 * editorial card with a serif heading, restrained spacing, and a polished
 * disabled/submitting state on the button via isSubmitting from RHF.
 */
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="w-full max-w-md bg-paper-dim rounded-xl p-8 sm:p-10 border border-rule">
        <div className="mb-6 flex justify-center">
          <Logo width="110px" />
        </div>

        <h2 className="text-center font-display text-2xl font-semibold text-ink">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-clay">
          New to Blogify?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-terracotta hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>

        {error && (
          <p className="mt-6 text-center text-sm text-terracotta bg-terracotta/10 rounded-md py-2 px-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
