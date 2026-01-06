import React from 'react';
import MovieCard from '../Components/MovieCard';

const featuredMovies = [
  {
    id: 101,
    title: 'Inception',
    banner: 'https://i0.wp.com/tomatazos.buscafs.com/2020/07/origen-inception-christopher-nolan-dijo-critica-estreno.jpg?quality=75&strip=all',
    artist: 'Leonardo DiCaprio',
    director: 'Christopher Nolan',
    composer: 'Hans Zimmer',
    production: 'Warner Bros.',
    description: 'A skilled thief is given a chance at redemption if he can successfully perform inception.',
  },
  {
    id: 102,
    title: '3 Idiots',
    banner: 'https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2024/12/25/3_idiots_2.jpg',
    artist: 'Aamir Khan, R. Madhavan, Sharman Joshi',
    director: 'Rajkumar Hirani',
    composer: 'Shantanu Moitra',
    production: 'Vidhu Vinod Chopra Films',
    description: 'A fun and emotional journey of three friends navigating college, friendship and society.',
  },
  {
    id: 103,
    title: 'The Dark Knight',
    banner: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
    artist: 'Christian Bale, Heath Ledger',
    director: 'Christopher Nolan',
    composer: 'Hans Zimmer',
    production: 'DC, Warner Bros.',
    description: 'Batman battles the Joker in this gritty and powerful superhero thriller.',
  },
  {
    id: 104,
    title: 'Anand',
    banner: 'https://m.media-amazon.com/images/M/MV5BOGI5YjM2MzItOTljNi00OTA5LWI1MzAtMTk3YTViNmU1NjgxXkEyXkFqcGc@._V1_.jpg',
    artist: 'Rajesh Khanna, Amitabh Bachchan',
    director: 'Hrishikesh Mukherjee',
    composer: 'Salil Chowdhury',
    production: 'N.C. Sippy',
    description: '“Babumoshai Zindagi badi honi chahiye, lambi nahi.” — A heart-touching tale of friendship, hope, and living life fully.',
  },
];

const trendingMovies = [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 4,
    title: 'Avatar',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 5,
    title: 'Dangal',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg',
  },
  {
    id: 6,
    title: '3 Idiots',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 7,
    title: 'Shershaah',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTAzNzg0OGUtZmY1My00Y2VmLTk2YzYtNDU3MjlmNzU5ZjE3XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 8,
    title: 'RRR',
    poster: 'https://m.media-amazon.com/images/M/MV5BNjE5NTMwMzItYjExNS00NzJjLWJlM2ItN2ZjZDU0NjE0NjZiXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 9,
    title: 'Tare Zameen Par',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTI0ZGRiMDEtNGNjMS00MGU4LWI3OTktNzcxMDZmZTk3MTljXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 10,
    title: 'Jawan',
    poster: 'https://i.imgur.com/KZmUmGL.jpg',
  },
];

export default function Home() {
  return (
    <div className="home-page bg-black text-light ">
      {/* 🔥 Hero Slider */}
      <div id="heroSlider" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {featuredMovies.map((movie, index) => (
            <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={movie.banner} className="d-block w-100" alt={movie.title} style={{ maxHeight: '500px', objectFit: 'cover', filter: 'brightness(0.6)' }} />
              <div className="carousel-caption d-none d-md-block text-start bg-black bg-opacity-50 p-3 rounded">
                <h2 className="text-danger fw-bold">{movie.title}</h2>
                <p>{movie.description}</p>
                <p><strong>🎭 Artist:</strong> {movie.artist}</p>
                <p><strong>🎬 Director:</strong> {movie.director} &nbsp; | &nbsp; <strong>🎵 Composer:</strong> {movie.composer}</p>
                <p><strong>🏢 Production:</strong> {movie.production}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* 🚀 Platform Message */}
      <div className="text-center mb-5">
        <h2 className="text-danger fw-bold">🎥 Rate. Review. Recommend.</h2>
        <p className="lead">Your one-stop platform to explore, rate, and share your favorite movies!</p>
      </div>

      {/* 🎬 Trending Movies */}
      <div className="container">
        <h3 className="text-light mb-4">🔥 Trending Movies</h3>
        <div className="row g-4">
          {trendingMovies.map((movie) => (
            <div className="col-md-4 col-lg-3" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
