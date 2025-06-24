"use client";
import React, { useState } from "react";
import "./IndexMainList.css";

const IndexMainList = ({ dataList, activeLang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dataList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dataList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [isExpanded, setIsExpanded] = useState(false);

  if (!dataList || dataList.length === 0) {
    return null;
  }

  const {
    title,
    title_japanese,
    image,
    rank,
    type,
    episodes,
    month,
    day,
    year,
    score,
    status,
    rating,
    synopsis,
    trailer,
  } = dataList[currentIndex];

  const toggleSynopsis = () => setIsExpanded((prev) => !prev);
  const shortSynopsis = synopsis?.slice(0, 350);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = month ? monthNames[month - 1] : "";

  const displayedTitle =
    activeLang === "JP" && title_japanese ? title_japanese : title;

  return (
    <div>
      <div className="content-container">
        <div className="main-content">
          <div className="text-section">
            <h4>#{rank} Top Anime</h4>
            <h1>{displayedTitle}</h1>
            <div className="info-row">
              <span>{type}</span>
              {/* <span>{episodes}eps</span> */}
              {/* <span>24m</span> */}
              <span>
                {monthName} {day}, {year}
              </span>
              {/* <span className="badge">HD</span> */}
              <span className="px-2 py-1 rounded-md text-sm font-semibold bg-yellow-100 text-yellow-700">
                {score} ⭐
              </span>
              <span className="px-2 py-1 rounded-md text-sm font-semibold bg-red-100 text-red-700">
                {episodes} Eps
              </span>
              <span className="px-2 py-1 rounded-md text-sm font-semibold bg-blue-200 text-blue-700">
                {rating}
              </span>
              <span className="px-2 py-1 rounded-md text-sm font-semibold bg-green-100 text-green-700">
                {status}
              </span>
            </div>
            <p className="text-justify">
              {isExpanded ? synopsis : `${shortSynopsis}...`}

              {synopsis?.length > 350 && (
                <button
                  onClick={toggleSynopsis}
                  className="text-blue-500 hover:underline text-sm mt-1 ml-5"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
            <div className="button-row">
              <button
                className="btn-watch"
                onClick={() => {
                  if (trailer) {
                    window.open(trailer, "_blank", "noopener,noreferrer");
                  } else {
                    alert("This trailer is empty");
                  }
                }}
              >
                {trailer ? "Watch Trailer" : "Empty Trailer"}
              </button>
            </div>
          </div>

          <div className="image-section">
            <div className="image-wrapper">
              <img src={image} alt={title} />
              <div className="button-group">
                <button className="nav-btn" onClick={handlePrev}>
                  ❮ Prev
                </button>
                <button className="nav-btn" onClick={handleNext}>
                  Next ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexMainList;
