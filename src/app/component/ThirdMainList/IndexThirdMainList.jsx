import React, { useState } from "react";
import "./IndexThirdMainList.css";

const IndexThirdMainList = ({ animeUpcoming, activeLang }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  const seenTitles = new Set();
  const filteredAnime = animeUpcoming.filter((item) => {
    const title = item.title?.trim(); // pastikan judul bersih dari spasi
    if (!title || seenTitles.has(title)) return false;
    seenTitles.add(title);
    return true;
  });

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Ubah ke angka index (0-based)
    const index = parseInt(monthNumber, 10) - 1;
    return monthNames[index] || "Not Knowing";
  }

  const year = animeUpcoming.length > 0 ? animeUpcoming[0].year : "-";

  return (
    <div className="anime-wrapper">
      <div className="anime-header">
        <h2>Top Upcoming Anime In {year}</h2>
      </div>

      <div className="anime-grid">
        {filteredAnime.map((item, index) => (
          <div
            key={item.mal_id || `anime-${index}`}
            className="anime-card cursor-pointer"
            onClick={() => setSelectedAnime(item)}
          >
            <span className="badge">{item.year || "-"}</span>
            <img src={item.images} alt={item.title} />
            <div className="flex justify-end mt-2 mb-2">
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                🏆 Rank #{index + 1}
              </span>
            </div>
            <h4 className="anime-titleup">
              {" "}
              {activeLang === "JP" && item.title_japan
                ? item.title_japan
                : item.title}
            </h4>
          </div>
        ))}
      </div>
      {selectedAnime && (
        <div className="modal-overlay" onClick={() => setSelectedAnime(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // mencegah modal tertutup saat isi diklik
          >
            <h3 className="anime-title8">{selectedAnime.title}</h3>
            <br />
            <p className="anime-info">
              <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-semibold">
                🎬 Producers: {selectedAnime.producers || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full font-semibold">
                🈲 Japanese Title: {selectedAnime.title_japan || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-semibold">
                👥 Members:{" "}
                {selectedAnime.members?.toLocaleString("en-US") || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-semibold">
                ⭐ Popularity: {selectedAnime.popularity || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold">
                📺 Status: {selectedAnime.status || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-semibold">
                🔞 Rating: {selectedAnime.rating || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-semibold">
                🏷️ Themes: {selectedAnime.themes || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-semibold">
                🎭 Genres: {selectedAnime.genres || "-"}
              </span>
            </p>
            <p className="anime-info">
              <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-semibold">
                📅 Aired: {getMonthName(selectedAnime.aired_month)}{" "}
                {selectedAnime.aired_day}, {selectedAnime.aired_year}
              </span>
            </p>

            <br />
            <p className="anime-synopsis">{selectedAnime.synopsis}</p>
            {selectedAnime.trailer ? (
              <a
                href={selectedAnime.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                Watch Trailer
              </a>
            ) : (
              <div className="watch-btn disabled">Empty Trailer</div>
            )}
            <button
              className="close-btn"
              onClick={() => setSelectedAnime(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexThirdMainList;
