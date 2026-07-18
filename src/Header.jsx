import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { FiHeart, FiBookOpen, FiLogOut } from "react-icons/fi";

export default function Header({ user, logout, page, setPage }) {
  return (
    <header>
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white text-lg shadow shadow-[#c0a062]/30">
            <IoBookOutline />
          </div>
          <span className="text-gray-900 font-bold tracking-tight text-sm">
            SMART <span className="text-[#c0a062]">E-LIBRARY</span>
          </span>
        </div>

        {/* Nav tabs — only for regular users */}

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-gray-900 text-sm font-semibold leading-tight">
              {user.name || user.email}
            </p>
            <p className="text-gray-400 text-xs">
              {user.level ? `Level: ${user.level}` : user.role}
            </p>
          </div>
          <button
            onClick={logout}

            className=" cursor-pointer flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors"
          >
            <FiLogOut size={14} /> Sign out
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center max-sm:mt-2">
        {user.role !== "admin" && setPage && (
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 ">
            <button
              onClick={() => setPage("books")}
              className={`flex cursor-pointer items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                page === "books"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiBookOpen size={14} /> Books
            </button>
            <button
              onClick={() => setPage("favorites")}
              className={` cursor-pointer flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                page === "favorites"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiHeart size={14} /> Favorites
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
