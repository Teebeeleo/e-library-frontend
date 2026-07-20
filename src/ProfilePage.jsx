import React, { useState } from "react";
import { updateProfile, changePassword } from "./api";
import { FiUser, FiLock, FiCheckCircle } from "react-icons/fi";
import * as yup from "yup";
import { useFormik } from "formik";

const LEVELS = ["100L", "200L", "300L", "400L", "500L"];

export default function ProfilePage({ user, setUser }) {
  const [successMsg, setSuccessMsg] = useState("");

  // ── Profile form ──
  const profileFormik = useFormik({
    initialValues: {
      name:  user.name  || "",
      email: user.email || "",
      level: user.level || "",
    },
    validationSchema: yup.object({
      name:  yup.string().required("Name is required").min(2, "At least 2 characters"),
      email: yup.string().email("Invalid email").required("Email is required"),
      level: yup.string().required("Level is required"),
    }),
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      setSuccessMsg("");
      try {
        const data = await updateProfile(user.id, values);
        if (data?.error) return setStatus(data.error);
        const updated = { ...user, ...values };
        localStorage.setItem("user", JSON.stringify(updated));
        setUser(updated);
        setSuccessMsg("Profile updated successfully.");
      } catch (err) {
        setStatus(err.message || "Update failed.");
      }
    },
  });

  // ── Password form ──
  const passwordFormik = useFormik({
    initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: yup.object({
      currentPassword: yup.string().required("Current password is required"),
      newPassword:     yup.string().required("New password is required").min(6, "At least 6 characters").max(12, "Max 12 characters"),
      confirmPassword: yup.string().required("Please confirm password").oneOf([yup.ref("newPassword")], "Passwords do not match"),
    }),
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus("");
      setSuccessMsg("");
      try {
        const data = await changePassword(user.id, values.currentPassword, values.newPassword);
        if (data?.error) return setStatus(data.error);
        resetForm();
        setSuccessMsg("Password changed successfully.");
      } catch (err) {
        setStatus(err.message || "Password change failed.");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">

      {/* Page title */}
      <div className="mb-8">
        <h2 className="text-gray-900 text-xl font-bold">My Profile</h2>
        <p className="text-gray-400 text-sm mt-1">View and update your account details.</p>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <FiCheckCircle size={16} /> {successMsg}
        </div>
      )}

      {/* Avatar + info card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#BEAB85] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-gray-900 font-bold text-lg leading-tight">{user.name}</p>
          <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {user.level || "No level"}
            </span>
            <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Update profile form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-gray-900 font-bold text-sm mb-5 flex items-center gap-2">
          <FiUser size={15} className="text-[#BEAB85]" /> Personal Information
        </h3>

        {profileFormik.status && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {profileFormik.status}
          </div>
        )}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full text-black border border-gray-300 placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] focus:border-[#c0a062] transition"
              onChange={profileFormik.handleChange}
              onBlur={profileFormik.handleBlur}
              value={profileFormik.values.name}
            />
            {profileFormik.touched.name && profileFormik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{profileFormik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full text-black border border-gray-300 placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] focus:border-[#c0a062] transition"
              onChange={profileFormik.handleChange}
              onBlur={profileFormik.handleBlur}
              value={profileFormik.values.email}
            />
            {profileFormik.touched.email && profileFormik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{profileFormik.errors.email}</p>
            )}
          </div>

          {/* Level dropdown */}
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Academic Level</label>
            <select
              name="level"
              className="w-full text-black border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] focus:border-[#c0a062] transition bg-white"
              onChange={profileFormik.handleChange}
              onBlur={profileFormik.handleBlur}
              value={profileFormik.values.level}
            >
              <option value="">Select level…</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {profileFormik.touched.level && profileFormik.errors.level && (
              <p className="text-red-500 text-xs mt-1">{profileFormik.errors.level}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={profileFormik.handleSubmit}
          disabled={profileFormik.isSubmitting}
          className="mt-5 bg-[#BEAB85] hover:bg-[#c0a062] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          {profileFormik.isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* Change password form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-gray-900 font-bold text-sm mb-5 flex items-center gap-2">
          <FiLock size={15} className="text-[#BEAB85]" /> Change Password
        </h3>

        {passwordFormik.status && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {passwordFormik.status}
          </div>
        )}

        <div className="space-y-4">
          {[
            { label: "Current Password",  name: "currentPassword", placeholder: "Your current password" },
            { label: "New Password",      name: "newPassword",     placeholder: "Min. 6 characters"     },
            { label: "Confirm Password",  name: "confirmPassword", placeholder: "Repeat new password"   },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</label>
              <input
                type="password"
                name={name}
                placeholder={placeholder}
                className="w-full text-black border border-gray-300 placeholder-zinc-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c0a062] focus:border-[#c0a062] transition"
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values[name]}
              />
              {passwordFormik.touched[name] && passwordFormik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">{passwordFormik.errors[name]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={passwordFormik.handleSubmit}
          disabled={passwordFormik.isSubmitting}
          className="mt-5 bg-[#c0a062] hover:bg-[#b18f4f] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          {passwordFormik.isSubmitting ? "Changing…" : "Change Password"}
        </button>
      </div>
    </div>
  );
}
