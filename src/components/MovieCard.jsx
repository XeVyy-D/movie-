import React from 'react';

function MovieCard({ title, year, poster }) {
  const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="yt-card">
      <div className="poster-wrapper">
        <img
          src={poster !== 'N/A' ? poster : placeholderImage}
          alt={title}
        />
      </div>

      <div className="yt-card-info">
        <h3 title={title}>{title}</h3>
        <p className="meta-text">{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;