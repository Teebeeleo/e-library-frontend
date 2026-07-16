export default function AdminPanel({ openAdd }) {
  return (
    <div className="mb-6">
      <button
        onClick={openAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Book
      </button>
    </div>
  );
}