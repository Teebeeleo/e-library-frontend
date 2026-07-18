import React from "react";
import { login } from "./api";
import { IoBookOutline } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";

export default function Login({ setUser, setView }) {
  const formSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required")
      .trim()
      .lowercase(),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must not exceed 12 characters"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        const data = await login(values.email, values.password);
        if (data?.error) return setStatus(data.error);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } catch (err) {
        setStatus(err.message || "Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c0a062] text-3xl mb-4 shadow-sm shadow-[#c0a062] drop-shadow animate-bounce">
            <IoBookOutline />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            SMART <span className="text-[#c0a062]">E-LIBRARY</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Enter your credentials to access digital collection
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-8">
          {formik.status && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {formik.status}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Institutional Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@university.edu"
                className="w-full border border-gray-300 text-black placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] transition"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                {/* Forgot password link */}
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-xs cursor-pointer text-[#c0a062] hover:text-[#b18f4f] font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 text-black placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] transition"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            className="w-full cursor-pointer mt-6 bg-[#c0a062] hover:bg-[#b18f4f]  disabled:opacity-50  text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {formik.isSubmitting ? "Logging in…" : "Log in to Library"}
          </button>

          <p className="text-center text-zinc-600 text-sm mt-5">
            No account?{" "}
            <button
              type="button"
              onClick={() => setView("register")}
              className="text-[#c0a062] hover:text-[#b18f4f] font-semibold cursor-pointer transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
