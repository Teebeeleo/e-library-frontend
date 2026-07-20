// ============================================================
//  api.js — All backend calls
//  Change API to your Render URL when deployed
// ============================================================

const API = "https://e-library-backend-m3ei.onrender.com";

// AUTH -------------------------------------------------------

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(name, email, password, level) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, level }),
  });
  return res.json();
}

export async function resetPassword(email, newPassword) {
  const res = await fetch(`${API}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  return res.json();
}

// PROFILE ----------------------------------------------------

export async function updateProfile(userId, fields) {
  const res = await fetch(`${API}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  return res.json();
}

export async function changePassword(userId, currentPassword, newPassword) {
  const res = await fetch(`${API}/users/${userId}/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return res.json();
}

// BOOKS ------------------------------------------------------

export async function fetchBooks() {
  const res = await fetch(`${API}/books`);
  return res.json();
}

export async function addBook(userId, title, author, category, pdfUrl, coverUrl, available) {
  const res = await fetch(`${API}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      title,
      author,
      category,
      pdf_url:   pdfUrl,
      cover_url: coverUrl,
      available,
    }),
  });
  return res.json();
}

export async function updateBook(bookId, fields) {
  const res = await fetch(`${API}/books/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  return res.json();
}

export async function deleteBook(bookId) {
  const res = await fetch(`${API}/books/${bookId}`, { method: "DELETE" });
  return res.json();
}

// FAVORITES --------------------------------------------------

export async function addFavorite(userId, bookId) {
  const res = await fetch(`${API}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });
  return res.json();
}

export async function fetchFavorites(userId) {
  const res = await fetch(`${API}/favorites/${userId}`);
  return res.json();
}

// DOWNLOADS --------------------------------------------------

export async function downloadBook(userId, bookId) {
  const res = await fetch(`${API}/downloads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });
  return res.json();
}

// NOTIFICATIONS ----------------------------------------------

export async function fetchNotifications(userId) {
  const res = await fetch(`${API}/notifications/${userId}`);
  return res.json();
}

export async function markNotificationRead(notifId) {
  const res = await fetch(`${API}/notifications/${notifId}/read`, {
    method: "PUT",
  });
  return res.json();
}

// STUDENTS ---------------------------------------------------

export async function fetchStudents() {
  const res = await fetch(`${API}/users`);
  return res.json();
}

// ADMIN STATS ------------------------------------------------

export async function fetchStats() {
  const res = await fetch(`${API}/stats`);
  return res.json();
}
