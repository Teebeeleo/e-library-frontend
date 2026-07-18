import React, { useState } from "react";
import { addBook, updateBook, fetchBooks } from "./api";
import { useFormik } from "formik";
import * as yup from "yup";
import { FiUpload, FiX } from "react-icons/fi";

const LEVELS = ["100L", "200L", "300L", "400L", "500L"];

export default function BookFormModal({ close, user, setBooks, existingBook }) {
  const isEdit = !!existingBook;
  const [coverPreview, setCoverPreview] = useState(existingBook?.cover_url || "");
  const [uploadingCover, setUploadingCover] = useState(false);

  const formSchema = yup.object({
    title:     yup.string().required("Title is required"),
    author:    yup.string().required("Author is required"),
    category:  yup.string().required("Please select a level"),
    pdf_url:   yup.string().url("Must be a valid URL").nullable(),
    cover_url: yup.string().nullable(),
    available: yup.number().min(0, "Cannot be negative").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title:     existingBook?.title     || "",
      author:    existingBook?.author    || "",
      category:  existingBook?.category  || "",
      pdf_url:   existingBook?.pdf_url   || "",
      cover_url: existingBook?.cover_url || "",
      available: existingBook?.available ?? 1,
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        if (isEdit) {
          await updateBook(existingBook._id, values);
        } else {
          await addBook(
            user.id,
            values.title,
            values.author,
            values.category,
            values.pdf_url,
            values.cover_url,
            Number(values.available)
          );
        }
        const updated = await fetchBooks();
        setBooks(Array.isArray(updated) ? updated : []);
        close();
      } catch (err) {
        setStatus(err.message || "Failed to save book.");
      }
    },
  });

  // Handle cover image file upload
  // Convert to base64 and store as cover_url
  // In production replace this with Cloudinary or similar upload
  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please select an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB.");

    setUploadingCover(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setCoverPreview(base64);
      formik.setFieldValue("cover_url", base64);
      setUploadingCover(false);
    };
    reader.readAsDataURL(file);
  }

  function removeCover() {
    setCoverPreview("");
    formik.setFieldValue("cover_url", "");
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl my-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 font-bold text-lg">
            {isEdit ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {formik.status && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
            {formik.status}
          </div>
        )}

        <div className="space-y-4">

          {/* Book Cover Upload */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Book Cover Image
            </label>
            {coverPreview ? (
              <div className="relative w-24 h-32">
                <img
                  src={coverPreview}
                  alt="Book cover"
                  className="w-24 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow"
                >
                  <FiX size={11} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-colors">
                <FiUpload className="text-gray-400 mb-2" size={20} />
                <span className="text-gray-400 text-xs font-medium">
                  {uploadingCover ? "Uploading…" : "Click to upload cover image"}
                </span>
                <span className="text-gray-300 text-xs mt-1">PNG, JPG up to 2MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Book title"
              className="w-full border border-teal-500  placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500  transition"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author name"
              className="w-full border border-teal-500  placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500  transition"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author}
            />
            {formik.touched.author && formik.errors.author && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.author}</p>
            )}
          </div>

          {/* Level dropdown */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Level</label>
            <select
              name="category"
              className="w-full border  text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="">Select level…</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
            )}
          </div>

          {/* PDF URL */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              PDF Link
              <span className="ml-1 text-gray-400 normal-case font-normal">(paste a Google Drive or Cloudinary link)</span>
            </label>
            <input
              type="text"
              name="pdf_url"
              placeholder="https://drive.google.com/…"
              className="w-full border   placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pdf_url}
            />
            {formik.touched.pdf_url && formik.errors.pdf_url && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.pdf_url}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Upload your PDF to Google Drive, set sharing to "Anyone with link", then paste the link here.
            </p>
          </div>

          {/* Available copies */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Available Copies</label>
            <input
              type="number"
              name="available"
              min={0}
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500  transition"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.available}
            />
            {formik.touched.available && formik.errors.available && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.available}</p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={close}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-sm font-bold transition-colors"
          >
            {formik.isSubmitting ? "Saving…" : isEdit ? "Save Changes" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}
