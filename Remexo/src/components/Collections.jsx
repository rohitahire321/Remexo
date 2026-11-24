import { useState } from "react";
import axios from "axios";

const API_URL = "https://remexo-backend.vercel.app/api";
const COLLECTIONS = [
  "All",
  "Rohit's_Special",
  "Party_Songs",
  "Romantic_Songs",
  "Sleep_Songs",
];

// Helper so "Party_Songs" matches both "Party_Songs" and "Party Songs" in MongoDB
const normalize = (str = "") => str.replace(/_/g, " ").trim().toLowerCase();

export default function Collections({ songs = [], onRefresh, showTabs = true }) {
  const [activeTab, setActiveTab] = useState("All");

  // If showTabs is false (Home page), show all songs; otherwise filter by activeTab
  const displayedSongs =
    !showTabs || activeTab === "All"
      ? songs
      : songs.filter(
          (song) => normalize(song.collection_name) === normalize(activeTab)
        );

  // Delete song by _id
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then(() => {
        if (onRefresh) onRefresh();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div className="w-full">
      {/* Responsive Page Title */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
        <h3 className="text-xl font-extrabold text-black sm:text-2xl">
          {showTabs ? "Your Collections 🎧" : "All Songs in Vault 🎵"}
        </h3>
        <span className="shrink-0 rounded-full bg-black px-3.5 py-1 text-xs font-bold text-[#FFF44F] sm:px-4">
          {displayedSongs.length} {displayedSongs.length === 1 ? "Song" : "Songs"}
        </span>
      </div>

      {/* Horizontally Scrollable Filter Tabs on Mobile, Wrapped on Desktop */}
      {showTabs && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 sm:mb-6 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:pb-0">
          {COLLECTIONS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition sm:px-5 sm:text-sm ${
                activeTab === tab
                  ? "bg-black text-[#FFF44F] shadow-md"
                  : "bg-black/15 text-black hover:bg-black/25"
              }`}
            >
              {tab.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      )}

      {/* Songs Grid */}
      {displayedSongs.length === 0 ? (
        <div className="rounded-2xl bg-black/15 p-8 text-center text-sm font-bold text-black/80 sm:p-10 sm:text-base">
          No songs found{" "}
          {showTabs && activeTab !== "All"
            ? `in "${activeTab.replace(/_/g, " ")}"`
            : "yet"}
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedSongs.map((song, index) => (
            <div
              key={song._id}
              className="flex flex-col justify-between rounded-2xl bg-black p-4 text-white shadow-lg transition hover:-translate-y-1 sm:p-5"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5">
                  <span className="rounded-full bg-[#FFF44F]/15 px-3 py-0.5 text-xs font-bold text-[#FFF44F]">
                    #{index + 1} • {song.collection_name?.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-yellow-400">
                    {"⭐".repeat(song.stars)}
                  </span>
                </div>

                <h4 className="break-words text-base font-extrabold text-white sm:text-lg">
                  {song.song_name}
                </h4>
                <p className="mt-0.5 break-words text-xs text-zinc-400 sm:text-sm">
                  {song.movie_name} •{" "}
                  <span className="text-zinc-200">{song.artist}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-800 pt-3 sm:mt-5">
                {song.link ? (
                  <a
                    href={song.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#FFF44F] px-3.5 py-2 text-xs font-extrabold text-black transition hover:bg-yellow-300 sm:py-1.5"
                  >
                    ▶ Play Link
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500">No link added</span>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(song._id)}
                  className="cursor-pointer rounded-lg bg-red-500/15 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/25 sm:px-3 sm:py-1.5"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
