import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import MovieCard from "../components/MovieCard/MovieCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMovies, AppThunk } from "../redux/slices/movieSlice";
import axios from "axios";
import { useRouter } from "next/router";

interface Movie {
  _id: string;
  title: string;
  year: number | string;
  image: string;
}

const ITEMS_PER_PAGE = 4;

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const movies = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    dispatch(fetchMovies() as any);
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        if (movies.length == 0) {
          router.push("/empty-state");
        }
      }
    }, 4000);
  }, [loading, error, movies, router]);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative w-11/12 md:w-9/12 h-full">
      <Navbar />

      <div className=" mt-24 flex justify-start mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="rounded-md p-2 text-white outline-none bg-gray-500 bg-opacity-20"
          value={searchMovie}
          onChange={handleSearch}
        />
      </div>

      <div className=" w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center ">
        {loading ? (
          <div className=" text-white flex justify-center items-center">
            Loading
          </div>
        ) : (
          ""
        )}

        {filteredMovies.length === 0 && !loading && (
          <div className="text-white text-center">Movie not found</div>
        )}

        {currentMovies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`mx-2 px-4 py-2 bg-primary_v2 text-white rounded-md mb-40 md:mb-4 ${
                page === currentPage ? "bg-opacity-80" : "bg-opacity-40"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
