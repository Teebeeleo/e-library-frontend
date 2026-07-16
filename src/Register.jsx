import React, { useState } from "react";
import { register } from "./api";
import { IoBookOutline } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";
import { FiCheckCircle } from "react-icons/fi";

export default function Register({ setView }) {
  const [success, setSuccess] = useState(false);

  const formSchema = yup.object({
    name:     yup.string().required("Full name is required").min(2, "At least 2 characters").trim(),
    email:    yup.string().email("Please enter a valid email").required("Email is required").trim().lowercase(),
    password: yup.string().required("Password is required").min(6, "At least 6 characters").max(12, "Max 12 characters"),
    level:    yup.string().required("Level is required").trim(),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", level: "" },
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        const data = await register(values.name, values.email, values.password, values.level);
        if (data?.error) return setStatus(data.error);
        setSuccess(true);
        setTimeout(() => setView("login"), 3000);
      } catch (err) {
        setStatus(err.message || "Registration failed.");
      }
    },
  });

  const fields = [
    { label: "Full Name", name: "name",     type: "text",     placeholder: "Jane Doe"          },
    { label: "Email",     name: "email",    type: "email",    placeholder: "you@example.com"   },
    { label: "Password",  name: "password", type: "password", placeholder: "Min. 6 characters" },
    { label: "Level",     name: "level",    type: "text",     placeholder: "e.g. Stake 3"      },
  ];

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="bg-white shadow rounded-2xl p-10">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-green-500" size={56} />
            </div>
            <h2 className="text-gray-900 text-xl font-bold mb-2">Account Created!</h2>
            <p className="text-gray-500 text-sm mb-1">Your account has been successfully created.</p>
            <p className="text-gray-400 text-xs">Redirecting you to login in 3 seconds…</p>
            <button
              type="button"
              onClick={() => setView("login")}
              className="mt-6 w-full bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c0a062] text-3xl mb-4 shadow-sm shadow-[#c0a062] drop-shadow animate-bounce">
            <IoBookOutline />
          </div>
          <h1 className="text-black text-xl font-bold tracking-tight">
            SMART <span className="text-[#c0a062]">E-LIBRARY</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Create your account</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-8">
          {formik.status && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {formik.status}
            </div>
          )}

          <div className="space-y-4">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="w-full text-black border border-gray-300 placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] focus:border-[#c0a062] transition"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            className="w-full mt-6 bg-[#c0a062] hover:bg-[#b18f4f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {formik.isSubmitting ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-zinc-600 text-sm mt-5">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setView("login")}
              className="text-[#c0a062] hover:text-[#b18f4f] font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
