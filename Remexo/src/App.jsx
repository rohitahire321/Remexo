import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CiExport, CiSearch } from "react-icons/ci";
import { MdOutlineCollections } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import { FaHome } from "react-icons/fa";

import IntroSplash from "./components/IntroSplash";
import HeaderRain from "./components/HeaderRain";
import Search from "./components/Search";
import Add from "./components/Add";
import Collections from "./components/Collections";
import remexo from "./assets/remexo.jpg";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch all songs from backend
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const fetchSongs = () => {
    axios
      .get(`${API_URL}/api/get`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Filter songs by song_name, movie_name, or artist
  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      song.song_name?.toLowerCase().includes(query) ||
      song.movie_name?.toLowerCase().includes(query) ||
      song.artist?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-yellow-400">
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}

      {/* Responsive Black Header */}
      <header className="relative z-20 w-full border-b-2 border-black/15 bg-black px-4 py-3 md:px-8 md:py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer select-none items-center justify-between md:justify-start md:gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={remexo}
                alt="Remexo Logo"
                className="h-8 w-8 rounded-lg object-contain md:h-9 md:w-9"
              />
              <h2 className="bg-gradient-to-r from-[#FFF44F] via-yellow-300 to-yellow-100 bg-clip-text text-xl font-bold tracking-wide text-transparent md:text-2xl">
                Remexo
              </h2>
            </div>
            <span className="text-xs text-yellow-400 md:text-sm">
              Your Personal Music Vault
            </span>
          </div>

          {/* Responsive Navigation Icons */}
          <nav className="flex items-center justify-around border-t border-zinc-800 pt-2.5 text-yellow-400 md:justify-end md:gap-8 md:border-none md:pt-0">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex cursor-pointer flex-col items-center gap-0.5 text-xs hover:text-[#FFF44F] md:flex-row md:gap-1 md:text-base"
            >
              <FaHome className="text-xl md:text-2xl" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/search")}
              className="flex cursor-pointer flex-col items-center gap-0.5 text-xs hover:text-[#FFF44F] md:flex-row md:gap-1 md:text-base"
            >
              <CiSearch className="text-2xl md:text-3xl" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/add")}
              className="flex cursor-pointer flex-col items-center gap-0.5 text-xs hover:text-[#FFF44F] md:flex-row md:gap-1 md:text-base"
            >
              <CiExport className="text-2xl md:text-3xl" />
              <span>Add</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/collections")}
              className="flex cursor-pointer flex-col items-center gap-0.5 text-xs hover:text-[#FFF44F] md:flex-row md:gap-1 md:text-base"
            >
              <MdOutlineCollections className="text-2xl md:text-3xl" />
              <span>Collection</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/report")}
              className="flex cursor-pointer flex-col items-center gap-0.5 text-xs hover:text-[#FFF44F] md:flex-row md:gap-1 md:text-base"
            >
              <TbMessageReport className="text-2xl md:text-3xl" />
              <span>Report</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Falling Black Rain */}
      <HeaderRain />

      {/* Page Routes */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        {/* Mobile-Scaled Hero Title */}
        <div className="mb-6 flex flex-col items-center justify-center gap-1 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-black sm:text-7xl md:text-9xl">
            Remexo
          </h2>
          <p className="text-lg font-medium text-black/85 sm:text-2xl md:text-3xl">
            Here, Music Meets You
          </p>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Collections songs={songs} onRefresh={fetchSongs} showTabs={false} />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredSongs={filteredSongs}
              />
            }
          />
          <Route path="/add" element={<Add onSongAdded={fetchSongs} />} />
          <Route
            path="/collections"
            element={
              <Collections songs={songs} onRefresh={fetchSongs} showTabs={true} />
            }
          />
          <Route
            path="/report"
            element={
              <div className="rounded-2xl bg-black p-5 text-white shadow-xl md:p-6">
                <h3 className="text-xl font-bold text-[#FFF44F]">Music Report 📊</h3>
                <p className="mt-2 text-zinc-300">
                  Total Songs in Vault: {songs.length}
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
