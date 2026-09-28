import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import './App.css';

const API_KEY = 'd041fe12';

const RANDOM_KEYWORDS = [
  'Avengers', 
  'Batman', 
  'Spider-Man', 
  'Harry Potter', 
  'Naruto', 
  'Star Wars', 
  'Matrix', 
  'Godzilla'
];

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'Film tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal menghubungkan ke server API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const randomTerm = RANDOM_KEYWORDS[Math.floor(Math.random() * RANDOM_KEYWORDS.length)];
    setCurrentKeyword(randomTerm);
    fetchMovies(randomTerm);
  }, []);

  const handleSearch = () => {
    const queryToSearch = searchQuery.trim() !== '' ? searchQuery : currentKeyword;
    fetchMovies(queryToSearch);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="content">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {loading && <p className="status-text">Memuat data film...</p>}
        {error && <p className="status-text error">{error}</p>}

        {!loading && !error && (
          <div className="yt-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;