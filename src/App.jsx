import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import AdminDashboard from "./AdminDashboard";
import BookList from "./BookList";
import { fetchBooks } from "./api";

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
  });

  // landing | login | register | forgot
  const [view, setView] = useState("landing");
  const [books, setBooks] = useState([]);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setBooks([]);
    setView("landing");
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      fetchBooks().then((data) => {
        if (Array.isArray(data)) setBooks(data);
      }).catch(() => {});
    }
  }, [user]);

  // Not logged in — show public pages
  if (!user) {
    if (view === "login")    return <Login setUser={setUser} setView={setView} />;
    if (view === "register") return <Register setView={setView} />;
    if (view === "forgot")   return <ForgotPassword setView={setView} />;
    return <LandingPage setView={setView} />;
  }

  // Logged in
  if (user.role === "admin") {
    return <AdminDashboard user={user} logout={logout} />;
  }

  return <BookList books={books} setBooks={setBooks} user={user} logout={logout} />;
}
