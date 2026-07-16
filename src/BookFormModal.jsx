import React from "react";
import { addBook, updateBook, fetchBooks } from "./api";
import { useFormik } from "formik";
import * as yup from "yup";

const LEVELS = ["100L", "200L", "300L", "400L", "500L"];

export default function BookFormModal({ close, user, setBooks, existingBook }) {
  const isEdit = !!existingBook;

  const formSchema = yup.object({
    title:     yup.string().required("Title is required"),
    author:    yup.string().required("Author is required"),
    category:  yup.string().required("Please select a level"),
    pdf_url:   yup.string().url("Must be a valid URL").nullable(),
    available: yup.number().min(0, "Cannot be negative").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title:     existingBook?.title     || "",
      author:    existingBook?.author    || "",
      category:  existingBook?.category  || "",
      pdf_url:   existingBook?.pdf_url   || "",
      available: existingBook?.available ?? 1,
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        if (isEdit) {
          await updateBook(existingBook._id, values);
        } else {
          await addBook(user.id, values.title, values.author, values.category, values.pdf_url, Number(values.available));
        }
        const updated = await fetchBooks();
        setBooks(updated);
        close();
      } catch (err) {
        setStatus(err.message || "Failed to save book.");
      }
    },
  });

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 font-bold text-lg">{isEdit ? "Edit Book" : "Add New Book"}</h2>
          <button onClick={close} className="text-gray-400 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">✕</button>
        </div>

        {formik.status && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{formik.status}</div>
        )}

        <div className="space-y-4">
          {[
            { label: "Title",  name: "title",  type: "text", placeholder: "Book title"  },
            { label: "Author", name: "author", type: "text", placeholder: "Author name" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{label}</label>
              <input
                type={type} name={name} placeholder={placeholder}
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name]}
              />
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Level</label>
            <select
              name="category"
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.category}
            >
              <option value="">Select level…</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">PDF URL</label>
            <input
              type="text" name="pdf_url" placeholder="https://…"
              className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pdf_url}
            />
            {formik.touched.pdf_url && formik.errors.pdf_url && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.pdf_url}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Available Copies</label>
            <input
              type="number" name="available" min={0}
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.available}
            />
            {formik.touched.available && formik.errors.available && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.available}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={close} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">Cancel</button>
          <button
            onClick={formik.handleSubmit} disabled={formik.isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-sm font-bold transition-colors"
          >
            {formik.isSubmitting ? "Saving…" : isEdit ? "Save Changes" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}
