import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-section">
      <form className="yt-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cari judul film..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">🔍 Cari</button>
      </form>
    </div>
  );
}

export default SearchBar;