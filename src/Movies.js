import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://hoblist.com/api/movieList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "pageViews"
        })
      });
      const data = await response.json();
      const sortedMovies = data.result.sort((a, b) => b.pageViews - a.pageViews); // Sort movies by page views in descending order (max to min)
      setMovies(sortedMovies || []);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Movies List</h2>
      <div className="list-group">
        {movies.map((movie, index) => (
          <div key={index} className="list-group-item">
            <img src={`${movie.poster}`} className="img-fluid img-thumbnail" style={{ maxHeight: 150 }} />
            <h5>{movie.title}</h5>
            <p>Genre: {movie.genre}</p>
            <p>Language: {movie.language}</p>
            <p>Stars: {movie.stars}</p>
            <p>Page Views: {movie.pageViews}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;