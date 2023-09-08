import { useState } from "react";

export const SearchMovies = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "4aa9e220333fe463b7079a4244f0778c";

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.log("Se ha dado un error que es:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de Películas</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busca tu película"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
