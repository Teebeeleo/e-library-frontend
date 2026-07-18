import React, { useState, useEffect } from "react";
import Header from "./Header";
import BookFormModal from "./BookFormModal";
import { IoBookSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { fetchBooks, fetchStats, fetchStudents, deleteBook } from "./api";

export default function AdminDashboard({ user, logout }) {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ users: 0, books: 0, downloads: 0 });
  const [students, setStudents] = useState([]);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("books");

  useEffect(() => {
    async function load() {
      try {
        const [b, s, st] = await Promise.all([
          fetchBooks(),
          fetchStats(),
          fetchStudents(),
        ]);
        setBooks(Array.isArray(b) ? b : []);
        setStats(s || { users: 0, books: 0, downloads: 0 });
        setStudents(Array.isArray(st) ? st : []);
      } catch (err) {
        console.error("Failed to load:", err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(book) {
    if (!confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    try {
      await deleteBook(book._id);
      setBooks((prev) => prev.filter((b) => b._id !== book._id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.level?.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  const statCards = [
    { label: "Total Students", value: stats.users, icon: <FaRegUser /> },
    { label: "Total Books", value: stats.books, icon: <IoBookSharp /> },
    { label: "Downloads", value: stats.downloads, icon: <FaDownload /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} logout={logout} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-gray-900 text-2xl font-bold tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage books and monitor library activity.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          {statCards.map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm  "
            >
              <p className="text-2xl mb-3 flex justify-center text-[#beab85] ">{icon}</p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "—" : (value ?? 0)}
              </p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("books")}
            className={` cursor-pointer px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "books"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <p className=" flex gap-2 items-center">
              <IoBookSharp   />Books
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("students")}
            className={` cursor-pointer  px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "students"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <p className=" flex gap-2 items-center">
              <FaRegUser /> Students{" "}
              {students.length > 0 && `(${students.length})`}
            </p>
          </button>
        </div>

        {/* BOOKS TAB */}
        {activeTab === "books" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div className="relative flex-1 max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  <IoSearch size={16} />
                </span>
                <input
                  placeholder="Search books…"
                  className="w-full bg-gray-50 border border-[#beab85] text-gray-700 rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-[#C0A062]  transition"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => setModal("add")}
                className="bg-[#beab85] hover:bg-[#C0A062] cursor-pointer text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                + Add Book
              </button>
            </div>

            {loading ? (
              <div className="p-10 text-center text-gray-400 animate-pulse">
                Loading books…
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="p-10 flex justify-center items-center text-center text-gray-400">
                <p className="text-3xl ">
                  <MdImageNotSupported />
                </p>
                <p>No books found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                      <th className="text-left px-5 py-3 font-semibold">
                        Title
                      </th>
                      <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">
                        Author
                      </th>
                      <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">
                        Level
                      </th>
                      <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">
                        PDF
                      </th>
                      <th className="text-left px-5 py-3 font-semibold">
                        Copies
                      </th>
                      <th className="text-right px-5 py-3 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredBooks.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-gray-900 font-medium max-w-45 truncate">
                          {book.title}
                        </td>
                        <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                          {book.author}
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {book.category ? (
                            <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              {book.category}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          {book.pdf_url ? (
                            <a
                              href={book.pdf_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-teal-500 hover:text-teal-700 text-xs underline underline-offset-2"
                            >
                              View PDF
                            </a>
                          ) : (
                            <span className="text-gray-300 text-xs">
                              No PDF
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-gray-500">
                          {book.available ?? "—"}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              
                              onClick={() => setModal(book)}
                              className="text-xs cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <p className="flex gap-2 items-center"><MdModeEditOutline size={16} /> Edit</p>
                            
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(book)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <p className="flex gap-2 items-center"><MdDeleteOutline size={16}/> Delete</p>
                              
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === "students" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div className="relative flex-1 max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  <IoSearch size={16} />
                </span>
                <input
                  placeholder="Search by name, email or level…"
                  className="w-full bg-gray-50 border border-[#beab85] text-gray-700 rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-[#beab85] transition"
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                {filteredStudents.length}{" "}
                {filteredStudents.length === 1 ? "student" : "students"}
              </span>
            </div>

            {loading ? (
              <div className="p-10 text-center text-gray-400 animate-pulse">
                Loading students…
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <p className="text-3xl mb-2">👤</p>
                <p>No students registered yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                      <th className="text-left px-5 py-3 font-semibold">
                        Name
                      </th>
                      <th className="text-left px-5 py-3 font-semibold">
                        Email
                      </th>
                      <th className="text-left px-5 py-3 font-semibold">
                        Level
                      </th>
                      <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#beab85] flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {student.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-900 font-medium">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-5 py-4">
                          {student.level ? (
                            <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              {student.level}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs hidden md:table-cell">
                          {student.createdAt
                            ? new Date(student.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {modal && (
        <BookFormModal
          close={() => setModal(null)}
          user={user}
          setBooks={setBooks}
          existingBook={modal === "add" ? null : modal}
        />
      )}
    </div>
  );
}
