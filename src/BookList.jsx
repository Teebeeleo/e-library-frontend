import React, { useState } from "react";
import { downloadBook, addFavorite, deleteBook } from "./api";
import Header from "./Header";
import FavoritesPage from "./FavoritesPage";
import { IoSearchSharp } from "react-icons/io5";
import { FiHeart, FiTrash2, FiDownload } from "react-icons/fi";

export default function BookList({ books, setBooks, user, logout }) {
  const CATEGORIES = ["All", "100L", "200L", "300L", "400L", "500L"];

  const [page, setPage] = useState("books");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [downloading, setDownloading] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loadingFav, setLoadingFav] = useState(null);

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || b.category === activeCategory;
    return matchSearch && matchCategory;
  });

  async function handleDownload(book) {
    if (!book.pdf_url) return alert("No PDF available for this book.");
    setDownloading(book._id);
    try {
      await downloadBook(user.id, book._id);
      window.open(book.pdf_url, "_blank");
    } catch (err) {
      alert("Download failed: " + err.message);
    } finally {
      setDownloading(null);
    }
  }

  async function handleFavorite(bookId) {
    setLoadingFav(bookId);
    try {
      await addFavorite(user.id, bookId);
      setFavorites((prev) => new Set([...prev, bookId]));
    } catch (err) {
      alert("Could not save favorite: " + err.message);
    } finally {
      setLoadingFav(null);
    }
  }

  async function handleDelete(book) {
    if (!confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    try {
      await deleteBook(book._id);
      setBooks((prev) => prev.filter((b) => b._id !== book._id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} logout={logout} page={page} setPage={setPage} />

      {page === "favorites" && <FavoritesPage user={user} />}

      {page === "books" && (
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Search */}
          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <IoSearchSharp />
            </span>
            <input
              placeholder="Search by title or author…"
              className="w-full bg-white border border-gray-200  placeholder-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500  shadow-sm transition"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Level filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-teal-600 border-teal-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-gray-500 text-sm mb-5">
            Showing{" "}
            <span className="font-bold text-gray-800">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "book" : "books"}
          </p>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-gray-400 font-medium">No books found.</p>
              <p className="text-gray-300 text-sm mt-1">
                {books.length === 0
                  ? "The admin has not added any books yet."
                  : "Try a different search or filter."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((book) => (
                <div
                  key={book._id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Book cover */}
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg shrink-0 shadow border border-gray-100"
                    />
                  ) : (
                    <div className="w-16 h-20 bg-teal-500 rounded-lg flex items-center justify-center shrink-0 shadow">
                      <span className="text-white text-xs font-bold tracking-wide text-center leading-tight px-1">
                        BOOK
                      </span>
                    </div>
                  )}

                  {/* Book details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-semibold text-sm leading-snug truncate">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      by {book.author}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {book.year && <span>{book.year}</span>}
                      {book.year && book.category && <span> • </span>}
                      {book.category && <span>{book.category}</span>}
                    </p>

                    {/* Available badge */}
                    <span
                      className={`inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        book.available > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.available > 0 ? "Available" : "Unavailable"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => handleDownload(book)}
                        disabled={downloading === book._id || !book.pdf_url}
                        className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                      >
                        <FiDownload size={13} />
                        {downloading === book._id ? "Opening…" : "Download"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFavorite(book._id)}
                        disabled={
                          favorites.has(book._id) || loadingFav === book._id
                        }
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                          favorites.has(book._id)
                            ? "text-red-500 cursor-default"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <FiHeart size={13} />
                        {favorites.has(book._id) ? "Saved" : "Favorite"}
                      </button>

                      {user.role === "admin" && (
                        <button
                          type="button"
                          onClick={() => handleDelete(book)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 font-medium transition-colors ml-auto"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
