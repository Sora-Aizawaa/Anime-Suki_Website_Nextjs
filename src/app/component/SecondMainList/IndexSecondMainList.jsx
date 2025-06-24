import React from "react";
import "./IndexSecondMainList.css";

const IndexSecondMainList = ({ characterList, activeLang, charCount }) => {
  const scrollLeft = () => {
    const container = document.getElementById("scrollable");
    if (container) container.scrollLeft -= 200;
  };

  const scrollRight = () => {
    const container = document.getElementById("scrollable");
    if (container) container.scrollLeft += 200;
  };

  return (
    <div className="trending-wrapper">
      <h4 className="trending-title">
        Top {charCount} Anime Character Rankings{" "}
      </h4>

      <div className="scroll-container">
        <div className="trending-scroll" id="scrollable">
          {characterList.length > 0 &&
            characterList.map((char, index) => (
              <div key={`${char.key}-${index}`} className="anime-card">
                <img
                  src={char.images}
                  alt={char.name}
                  className="anime-image"
                />

                <div className="anime-title">
                  {activeLang === "JP" && char.name_kanji
                    ? char.name_kanji
                    : char.name}
                </div>
                <div className="anime-rank">
                  Rank. {String(index + 1).padStart(2, "0")}
                </div>

                <div className="Likes">
                  ❤️ {char.favorites.toLocaleString("id-ID")} Likes{" "}
                </div>
              </div>
            ))}

          <div className="scroll-controls">
            <button className="scroll-btn-prev" onClick={() => scrollLeft()}>
              ❮ Prev
            </button>
            <button className="scroll-btn-next" onClick={() => scrollRight()}>
              Next ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexSecondMainList;
