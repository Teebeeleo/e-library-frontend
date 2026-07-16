import React, { useEffect, useState } from "react";
import { fetchFavorites } from "./api";
import { FiBookOpen } from "react-icons/fi";

export default function FavoritesPage({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    fetchFavorites(user.id)
      .then((data) => {
        // backend may return array or object with error
        if (Array.isArray(data)) setFavorites(data);
        else setError(data?.error || "Could not load favorites.");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-400 animate-pulse">Loading favorites…</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-red-400">{error}</p>
        <p className="text-gray-400 text-sm mt-2">
          Make sure your backend is running on localhost:5000
        </p>
      </div>
    );

  if (favorites.length === 0)
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-5xl mb-4">🤍</p>
        <p className="text-gray-500 font-medium">No favorites yet.</p>
        <p className="text-gray-400 text-sm mt-1">
          Go to Books and click the Favorite button on any book.
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-gray-800 font-bold text-xl mb-6">
        My Favorites ({favorites.length})
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((book) => {
          if (!book) return null;
          return (
            <div
              key={book._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-20 bg-teal-500 rounded-lg flex items-center justify-center shrink-0 shadow">
                <span className="text-white text-xs font-bold tracking-wide">
                  BOOK
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-semibold text-sm leading-snug truncate">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">by {book.author}</p>
                <p className="text-gray-400 text-xs mt-0.5">{book.category}</p>
                <span
                  className={`inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    book.available > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {book.available > 0 ? "Available" : "Unavailable"}
                </span>
                {book.pdf_url && (
                  <a
                    href={book.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 font-medium mt-3 transition-colors"
                  >
                    <FiBookOpen size={13} /> Read PDF
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
