import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const COLLECTIONS = [
  "Rohit's_Special",
  "Party_Songs",
  "Romantic_Songs",
  "Sleep_Songs",
];

export default function Add({ onSongAdded }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    song_name: "",
    movie_name: "",
    stars: 5,
    artist: "",
    collection_name: "Rohit's_Special",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stars" ? Number(value) : value,
    }));
  };

  // Submits when clicking Save OR pressing Enter in any input box
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${API_URL}/api/add`, formData)
      .then(() => {
        if (onSongAdded) onSongAdded(); // Refresh songs state in App.jsx
        setFormData({
          song_name: "",
          movie_name: "",
          stars: 5,
          artist: "",
          collection_name: "Rohit's_Special",
          link: "",
        });
        navigate("/collections"); // Redirect to Collections to see your new song
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to add song");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-black/10 bg-black p-5 text-white shadow-2xl sm:p-8"
      >
        <div className="mb-5 border-b border-zinc-800 pb-4 sm:mb-6">
          <h3 className="text-xl font-extrabold text-[#FFF44F] sm:text-2xl">
            Add a New Song 🎵
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            Fill in the details below and press{" "}
            <span className="font-semibold text-yellow-300">Enter</span> to save to your vault.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {/* 1. Song Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Song Name *
            </label>
            <input
              type="text"
              name="song_name"
              placeholder="e.g., Soch Na Sake"
              value={formData.song_name}
              onChange={handleChange}
              required
              autoFocus
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white placeholder-zinc-500 focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            />
          </div>

          {/* 2. Movie Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Movie Name *
            </label>
            <input
              type="text"
              name="movie_name"
              placeholder="e.g., Airlift"
              value={formData.movie_name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white placeholder-zinc-500 focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            />
          </div>

          {/* 3. Artists */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Artists *
            </label>
            <input
              type="text"
              name="artist"
              placeholder="e.g., Arijit Singh"
              value={formData.artist}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white placeholder-zinc-500 focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            />
          </div>

          {/* 4. Stars (1 to 5) */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Stars *
            </label>
            <select
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            >
              {Array.from({ length: 5 }, (_, i) => 5 - i).map((num) => (
                <option key={num} value={num}>
                  {"⭐".repeat(num)} ({num} {num === 1 ? "Star" : "Stars"})
                </option>
              ))}
            </select>
          </div>

          {/* 5. Collection Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Collection Name *
            </label>
            <select
              name="collection_name"
              value={formData.collection_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            >
              {COLLECTIONS.map((col) => (
                <option key={col} value={col}>
                  {col.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Song Link */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Song Link (Optional)
            </label>
            <input
              type="url"
              name="link"
              placeholder="https://youtu.be..."
              value={formData.link}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-base text-white placeholder-zinc-500 focus:border-[#FFF44F] focus:outline-none sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        {/* Mobile-Stacked Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-[#FFF44F] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-yellow-300 disabled:opacity-50 sm:w-auto sm:py-2.5"
          >
            {loading ? "Saving..." : "Save Song (or Press Enter)"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full cursor-pointer rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 sm:w-auto sm:py-2.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
