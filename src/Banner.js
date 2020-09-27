import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios.js";
import requests from "./requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //console.log(request.data.results);
      //Math.floor(x) returns biggest int of x
      //Math.random() returns random numeric value between 0 and 1
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  //console.log(movie);

  // take a str and hide the text after n characters displayed
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        {/* description */}
      </div>
      {/* fadeBottom as modifier for 'banner' in BEM */}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
