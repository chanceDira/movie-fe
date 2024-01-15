import React from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../redux/slices/movieSlice";
import Notify from "../../utils/Notify";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  year: number | string;
  image: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteMovie(movie?._id) as any);
      Notify("Movie deleted", "success");
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (e) {
      Notify("Something went wrong !!", "error");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <div
        key={movie._id}
        className="cursor-pointer bg-primary_v2 p-2 rounded-md w-full"
      >
        <div>
        <Link href={`/${movie?._id}`}>
          <img
            src={movie.image}
            alt={movie.title}
            className="rounded-md w-full h-auto md:w-48 md:h-64 lg:w-64 lg:h-80"
            />
        </Link>
        </div>
        <div className="text-white text-xl my-4">{movie.title}</div>
        <div className="text-white font-light flex flex-row items-center justify-between">
          <div>{movie.year}</div>
          <div className="flex flex-row gap-12">
            <div>
              <Link href={`/${movie?._id}`}>
                <Icon icon="tabler:edit" color="white" width="20" height="20" />
              </Link>
            </div>
            <div onClick={handleDelete}>
              <Icon
                icon="material-symbols:delete"
                color="white"
                width="20"
                height="20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
