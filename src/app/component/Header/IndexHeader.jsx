"use client";

import React, { useState } from "react";
import "./IndexHeader.css";
import Link from "next/link";

import MainList from "../MainList/IndexMainList.jsx";

const IndexHeader = ({ activeLang, setActiveLang, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [activeLang, setActiveLang] = useState("EN");
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${encodeURIComponent(
          query
        )}`
      );
      const result = await res.json();
      onSearch(result.data); // kirim hasil ke page.js
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <>
      <header className="header-container">
        {/* Logo & Search */}
        <div className="left-section">
          <div className="logo">
            <img src="/sharingan.svg" alt="Logo" className="logo-img" />
            <Link href="/" className="logo-link">
              <span className="logo-text">
                <span className="ani">Anime</span>
                <span className="watch">Suki</span>
              </span>
            </Link>
          </div>

          <div className="social-icons">
            <a
              href="https://github.com/Sora-Aizawaa"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <img src="/github.svg" alt="GitHub" className="icon" />
            </a>
            <a
              href="https://instagram.com/skytea12"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <img
                src="/instagram.svg"
                alt="Instagram"
                className="icon instagram-icon"
              />
            </a>
          </div>

          {/* <div className="search-box">
          <input
            type="text"
            placeholder="Search anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div> */}
        </div>

        {/* Nav & Lang */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <div className="lang-buttons">
            <button
              className={activeLang === "EN" ? "active" : ""}
              onClick={() => setActiveLang("EN")}
            >
              EN
            </button>
            <button
              className={activeLang === "JP" ? "active" : ""}
              onClick={() => setActiveLang("JP")}
            >
              JP
            </button>
          </div>
          <Link href="/">Home</Link>
          <Link href="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>

        <MainList activeLang={activeLang} />

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </header>
    </>
  );
};

export default IndexHeader;
