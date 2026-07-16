import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { resetPassword } from "./api";
import * as yup from "yup";
import { useFormik } from "formik";
import { FiCheckCircle } from "react-icons/fi";

export default function ForgotPassword({ setView }) {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter new password, 3 = success
  const [email, setEmailValue] = useState("");

  // Step 1 — email form
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        // check if user exists
        setEmailValue(values.email);
        setStep(2);
      } catch (err) {
        setStatus(err.message || "Something went wrong.");
      }
    },
  });

  // Step 2 — new password form
  const passwordFormik = useFormik({
    initialValues: { password: "", confirm: "" },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("New password is required")
        .min(6, "At least 6 characters")
        .max(12, "Max 12 characters"),
      confirm: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        const data = await resetPassword(email, values.password);
        if (data?.error) return setStatus(data.error);
        setStep(3);
      } catch (err) {
        setStatus(err.message || "Reset failed.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c0a062] text-3xl mb-4 shadow-sm drop-shadow animate-bounce">
            <IoBookOutline />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            SMART <span className="text-[#c0a062]">E-LIBRARY</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Reset your password</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-8">

          {/* STEP 1 — Enter email */}
          {step === 1 && (
            <>
              <h2 className="text-gray-900 font-bold text-base mb-1">Forgot your password?</h2>
              <p className="text-gray-400 text-sm mb-5">Enter your email and we will let you set a new password.</p>

              {emailFormik.status && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                  {emailFormik.status}
                </div>
              )}

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 text-black placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] transition"
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.email}
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{emailFormik.errors.email}</p>
                )}
              </div>

              <button
                type="button"
                onClick={emailFormik.handleSubmit}
                disabled={emailFormik.isSubmitting}
                className="w-full mt-5 bg-[#c0a062] hover:bg-[#b18f4f] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 — Enter new password */}
          {step === 2 && (
            <>
              <h2 className="text-gray-900 font-bold text-base mb-1">Set new password</h2>
              <p className="text-gray-400 text-sm mb-5">
                Setting new password for <span className="text-gray-700 font-medium">{email}</span>
              </p>

              {passwordFormik.status && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                  {passwordFormik.status}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">New Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    className="w-full border border-gray-300 text-black placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] transition"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.password}
                  />
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{passwordFormik.errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Repeat your password"
                    className="w-full border border-gray-300 text-black placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] transition"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.confirm}
                  />
                  {passwordFormik.touched.confirm && passwordFormik.errors.confirm && (
                    <p className="text-red-500 text-xs mt-1">{passwordFormik.errors.confirm}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={passwordFormik.handleSubmit}
                disabled={passwordFormik.isSubmitting}
                className="w-full mt-5 bg-[#c0a062] hover:bg-[#b18f4f] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                {passwordFormik.isSubmitting ? "Saving…" : "Save New Password"}
              </button>
            </>
          )}

          {/* STEP 3 — Success */}
          {step === 3 && (
            <div className="text-center py-4">
              <FiCheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <h2 className="text-gray-900 font-bold text-lg mb-2">Password Reset!</h2>
              <p className="text-gray-400 text-sm mb-6">Your password has been updated successfully.</p>
              <button
                type="button"
                onClick={() => setView("login")}
                className="w-full bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Back to login */}
          {step !== 3 && (
            <p className="text-center text-zinc-600 text-sm mt-5">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-[#c0a062] hover:text-[#b18f4f] font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
