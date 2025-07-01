import React, { useState } from "react";
import "../ThirdMainList/IndexThirdMainList.css";

const Index = ({ recommendAnime, isLoading, activeLang }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  const formatDateTimeWIB = (isoDate) => {
    const date = new Date(isoDate);

    // Format tanggal: June 22, 2025
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);

    // Format jam: 20:48:00
    const formattedTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    return `${formattedDate}  `;
  };

  const seen = new Set();
  const uniqueRecommendAnime = recommendAnime.filter((anime) => {
    if (seen.has(anime.title)) {
      return false;
    }
    seen.add(anime.title);
    return true;
  });

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  return (
    <div className="anime-wrapper">
      <div className="anime-header">
        <h2>Top Recommended Anime </h2>
      </div>

      <div className="anime-grid">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="anime-card animate-pulse bg-gray-100 p-4 rounded"
              >
                <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
                <div className="w-full h-40 bg-gray-300 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-300 rounded mb-1" />
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
              </div>
            ))
          : uniqueRecommendAnime.map((item, index) => (
              <div
                key={item.mal_id || `anime-${index}`}
                className="anime-card cursor-pointer"
                onClick={() => setSelectedAnime(item)}
              >
                {/* <span className="badge">{formatDateTimeWIB(item.date)}</span> */}
                <img
                  src={item.images}
                  alt={item.title}
                  className="rounded mb-2"
                />
                <div className="flex justify-end mb-2">
                  <span className="bg-yellow-100 text-yellow-700 text-xs !px-2 !py-1 rounded-full font-semibold !mt-1">
                    🏆 Rank #{index + 1}
                  </span>
                </div>
                <h4 className="anime-titleup">
                  {" "}
                  {activeLang === "JP" && item.title_japanese
                    ? item.title_japanese
                    : item.title}
                </h4>
              </div>
            ))}
      </div>

      {selectedAnime && (
        <div className="modal-overlay" onClick={() => setSelectedAnime(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="anime-title8 mb-4">{selectedAnime.title}</h3>
            <br />
            {/* Grid 2 kolom untuk informasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
              {/* Kolom Kiri */}
              <div className="space-y-3 ">
                <p className="inline-block bg-purple-100 text-purple-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🎬 Producers: {selectedAnime.producers || "-"}
                </p>
                <p className="inline-block bg-pink-100 text-pink-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🈲 Japanese Title: {selectedAnime.title_japanese || "-"}
                </p>
                <p className="inline-block bg-blue-100 text-blue-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  👥 Members:{" "}
                  {selectedAnime.members?.toLocaleString("en-US") || "-"}
                </p>
                <p className="inline-block bg-yellow-100 text-yellow-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  ⭐ Score: {selectedAnime.score || "-"}
                </p>
                <p className="inline-block bg-green-100 text-green-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  📅 Aired: {formatDateTimeWIB(selectedAnime.date)}
                </p>
                <p className="inline-block bg-indigo-100 text-indigo-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🏢 Studios: {selectedAnime.studios}
                </p>
                <p className="inline-block bg-pink-100 text-pink-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  ⏱️ Duration: {selectedAnime.duration}
                </p>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-3">
                <p className="inline-block bg-red-100 text-red-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  📺 Status: {selectedAnime.status || "-"}
                </p>
                <p className="inline-block bg-indigo-100 text-indigo-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🔞 Rating: {selectedAnime.rating || "-"}
                </p>
                <p className="inline-block bg-purple-100 text-purple-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🏷️ Themes: {selectedAnime.themes || "-"}
                </p>
                <p className="inline-block bg-gray-100 text-gray-700 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🎭 Genres: {selectedAnime.genres || "-"}
                </p>
                <p className="inline-block bg-orange-100 text-orange-800 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🎬 Episodes: {selectedAnime.episodes || "-"} Eps
                </p>
                <p className="inline-block bg-teal-100 text-teal-800 text-sm !px-3 !py-1 rounded-md font-semibold !mt-2">
                  🛡️ Licensors: {selectedAnime.licensors || "-"}
                </p>
              </div>
            </div>

            {/* Sinopsis (opsional, dipotong 200 kata jika perlu) */}
            <p className="anime-synopsis mb-4">
              {selectedAnime.synopsis
                ? truncateText(selectedAnime.synopsis, 350)
                : "No synopsis available."}
            </p>

            {/* Tombol Trailer */}
            {selectedAnime.trailer ? (
              <a
                href={selectedAnime.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                🎥 Watch Trailer
              </a>
            ) : (
              <div className="watch-btn disabled">🎞️ Trailer Not Available</div>
            )}

            {/* Tombol Tutup */}
            <button
              className="close-btn mt-4"
              onClick={() => setSelectedAnime(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
