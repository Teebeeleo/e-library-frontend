import React, { useState, useEffect } from "react";
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
  const [view, setView] = useState("login"); // login | register | forgot
  const [books, setBooks] = useState([]);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setBooks([]);
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      fetchBooks().then(setBooks).catch(() => {});
    }
  }, [user]);

  if (!user) {
    if (view === "register") return <Register setView={setView} />;
    if (view === "forgot")   return <ForgotPassword setView={setView} />;
    return <Login setUser={setUser} setView={setView} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} logout={logout} />;
  }

  return <BookList books={books} setBooks={setBooks} user={user} logout={logout} />;
}
