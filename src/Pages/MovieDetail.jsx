import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

// Dummy movie data (replace with real DB later)
const movieData = [
  {
    id: "1",
    title: "3 Idiots",
    banner: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",
    rating: "8.4",
  },
  {
    id: "2",
    title: "Lagaan",
    banner: "https://upload.wikimedia.org/wikipedia/en/b/b6/Lagaan.jpg",
    rating: "8.1",
  },
  // Add more as needed
];

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const found = movieData.find((m) => m.id === id);
    if (found) {
      setMovie(found);
    }
  }, [id]);

  if (!movie) return <div className="text-white p-10">🎬 Movie not found!</div>;

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Movie Details</h2>
      <div className="max-w-3xl mx-auto">
        <MovieCard movie={movie} showReviewForm={true} />
      </div>
    </div>
  );
};

export default MovieDetail;

