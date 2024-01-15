import React, { useEffect } from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const movies = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies() as any);
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        if(movies.length == 0) {
          router.push("/empty-state");
        }
      }
    }, 4000)
  }, [loading, error, movies, router])

  return (
    <div className="relative w-11/12 md:w-9/12 h-full">
      <Navbar />

      <div className="mt-28 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {loading ? (
          <div className=" text-white flex justify-center items-center">
            Loading
          </div>
        ) : (
          ""
        )}

        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
