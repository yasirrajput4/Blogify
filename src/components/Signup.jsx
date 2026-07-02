import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

/**
 * Signup — identical authService.createAccount / getCurrentUser /
 * dispatch / navigate flow. Same visual language as Login so the two
 * auth screens read as a matched pair.
 */
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
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
          Start writing
        </h2>
        <p className="mt-2 text-center text-sm text-clay">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-terracotta hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>

        {error && (
          <p className="mt-6 text-center text-sm text-terracotta bg-terracotta/10 rounded-md py-2 px-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
