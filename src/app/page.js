"use client";
import "./page.css";
import MainList from "./component/MainList/IndexMainList.jsx";
import Header from "./component/Header/IndexHeader.jsx";

import SecondMainList from "./component/SecondMainList/IndexSecondMainList.jsx";
import ThirdMainList from "./component/ThirdMainList/IndexThirdMainList.jsx";

import FourthMainList from "./component/FourthMainList/Index.jsx";

import Footer from "./component/Footer/Footer.jsx";

import { useState, useEffect } from "react";

function SkeletonCard() {
  return (
    <div className="bg-white p-4 shadow rounded animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4 rounded" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [activeLang, setActiveLang] = useState("EN");

  const [characterList, setCharacterList] = useState([]);
  const [charCount, setCharCount] = useState(0);

  const [animeUpcoming, setanimeUpcoming] = useState([]);

  const [recommendAnime, setrecommendAnime] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime`
      );
      const result = await response.json();
      // console.log(result);

      const formattedData = result.data.map((item) => ({
        key: item.mal_id,
        rank: item.rank,
        title: item.title_english || item.title,
        title_japanese: item.title_japanese,
        type: item.type,
        episodes: item.episodes,
        month: item.aired.prop.from.month,
        day: item.aired.prop.from.day,
        year: item.aired.prop.from.year,
        score: item.score,
        status: item.status,
        rating: item.rating,
        synopsis: item.synopsis,
        trailer: item.trailer.embed_url,
        image: item.images.webp.large_image_url,
      }));

      setDataList(formattedData);

      await sleep(400);

      const charResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/characters`
      );
      const charResult = await charResponse.json();

      const formattedDataChar = charResult.data.map((item) => ({
        key: item.mal_id,
        name: item.name,
        name_kanji: item.name_kanji,
        favorites: item.favorites,
        images: item.images.webp.image_url,
      }));

      setCharacterList(formattedDataChar);
      setCharCount(formattedDataChar.length);

      await sleep(400);

      const animeUpcomingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming`
      );
      const animeUpcomingResult = await animeUpcomingResponse.json();

      const formattedDataUpcoming = animeUpcomingResult.data.map((item) => ({
        key: item.mal_id,
        title: item.title_english,
        title_japan: item.title_japanese,
        images: item.images.webp.image_url,
        year: item.year,
        aired_year: item.aired.prop.from.year,
        aired_month: item.aired.prop.from.month,
        aired_day: item.aired.prop.from.day,
        producers: item.producers?.map((theme) => theme.name).join(", ") || "-",
        rating: item.rating,
        status: item.status,
        synopsis: item.synopsis,
        members: item.members.toLocaleString("en-US"),
        popularity: item.popularity.toLocaleString("en-US"),
        trailer: item.trailer.embed_url,
        themes: item.themes?.map((theme) => theme.name).join(", ") || "-",
        genres: item.genres?.map((genre) => genre.name).join(", ") || "-",
      }));

      setanimeUpcoming(formattedDataUpcoming);

      await sleep(400);

      // Tambahkan ini di atas
      function jeda(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      setIsLoading(true);

      const recommendAnimeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/anime`
      );
      const recommendAnimeResult = await recommendAnimeResponse.json();

      // Batasi untuk testing, misalnya ambil 20 dulu untuk lebih cepat
      const rawData = recommendAnimeResult.data.slice(0, 100);

      const formattedDataRecommended = [];

      for (const item of rawData) {
        const anime = item.entry?.[0]; // ambil anime pertama dari entry[]
        const animeId = anime?.mal_id;

        let trailerUrl = "-";
        let fullData = null;

        let title_japanese = "-";
        let score = "-";
        let members = "-";
        let status = "-";
        let rating = "-";
        let themes = "-";
        let genres = "-";
        let producers = "-";
        let episodes = "-";
        let licensors = "-";
        let studios = "-";
        let duration = "-";

        if (animeId) {
          try {
            const fullResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${animeId}/full`
            );
            const fullData = await fullResponse.json();
            console.log(fullData);
            trailerUrl = fullData?.data?.trailer?.embed_url || null;
            title_japanese = fullData?.data?.title_japanese;
            members = fullData?.data?.members;
            score = fullData?.data?.score;
            status = fullData?.data?.status;
            rating = fullData?.data?.rating;
            themes = fullData?.data?.themes?.map((t) => t.name).join(", ");
            genres = fullData?.data?.genres?.map((g) => g.name).join(", ");
            producers = fullData?.data?.producers
              ?.map((p) => p.name)
              .join(", ");
            episodes = fullData?.data?.episodes;
            licensors = fullData?.data?.licensors
              ?.map((l) => l.name)
              .join(", ");
            studios = fullData?.data?.studios?.map((s) => s.name).join(", ");
            duration = fullData?.data?.duration;
          } catch (err) {
            console.error(
              `Failed to fetch trailer for anime ID ${animeId}`,
              err
            );
          }

          // Tambahkan delay setelah setiap permintaan API detail
          await jeda(50);
        }

        formattedDataRecommended.push({
          key: animeId,
          title: anime?.title || "-",
          title_japanese: title_japanese,
          members: members,
          score: score,
          status: status,
          rating: rating,
          themes: themes,
          genres: genres,
          synopsis: item.content,
          images: anime?.images?.webp?.image_url || "-",
          producers: producers,
          date: item.date,
          trailer: trailerUrl,
          episodes: episodes,

          licensors: licensors,
          studios: studios,
          duration: duration,
        });
      }

      setrecommendAnime(formattedDataRecommended);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onSearch={setDataList}
      />
      <MainList dataList={dataList} activeLang={activeLang} />
      <SecondMainList
        characterList={characterList}
        activeLang={activeLang}
        charCount={charCount}
      />

      <ThirdMainList animeUpcoming={animeUpcoming} activeLang={activeLang} />
      <FourthMainList
        recommendAnime={recommendAnime}
        isLoading={isLoading}
        activeLang={activeLang}
      />

      <Footer />
    </div>
  );
}
