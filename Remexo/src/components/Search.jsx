import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search({
  searchQuery,
  setSearchQuery,
  filteredSongs = [],
}) {
  return (
    <div className="w-full">
      {/* Mobile-Friendly Search Bar */}
      <div className="mb-5 flex items-center gap-2.5 rounded-2xl bg-black px-3.5 py-3 text-white shadow-lg sm:mb-6 sm:gap-3 sm:px-4">
        <CiSearch className="shrink-0 text-2xl text-[#FFF44F]" />
        <input
          type="text"
          placeholder="Search song, artist, or movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-base text-white placeholder-yellow-400 focus:outline-none sm:text-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="shrink-0 cursor-pointer rounded-lg bg-[#FFF44F]/15 px-2.5 py-1 text-xs font-bold text-[#FFF44F] hover:bg-[#FFF44F]/25"
          >
            Clear
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredSongs.length === 0 ? (
        <div className="rounded-2xl bg-black/15 p-8 text-center text-sm font-bold text-black/80 sm:p-10 sm:text-base">
          No matching songs found{searchQuery ? ` for "${searchQuery}"` : ""}.
        </div>
      ) : (
        /* Filtered Results Grid */
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSongs.map((song, index) => (
            <div
              key={song._id}
              className="flex flex-col justify-between rounded-2xl bg-black p-4 text-white shadow-lg sm:p-5"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#FFF44F]/15 px-3 py-0.5 text-xs font-bold text-[#FFF44F]">
                    #{index + 1} • {song.collection_name}
                  </span>
                  {song.stars && (
                    <span className="text-xs text-yellow-400">
                      {"⭐".repeat(song.stars)}
                    </span>
                  )}
                </div>

                <h4 className="mt-1.5 break-words text-base font-extrabold sm:text-lg">
                  {song.song_name}
                </h4>
                <p className="mt-0.5 break-words text-xs text-zinc-400 sm:text-sm">
                  {song.movie_name} •{" "}
                  <span className="text-yellow-400">{song.artist}</span>
                </p>
              </div>

              {song.link && (
                <a
                  href={song.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block w-full rounded-xl bg-[#FFF44F] px-4 py-2 text-center text-xs font-extrabold text-black transition hover:bg-yellow-300 sm:inline-block sm:w-fit sm:py-1.5"
                >
                  ▶ Play Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
