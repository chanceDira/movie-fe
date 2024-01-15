import React from "react";
import { Primary } from "../components/Button/Button";
import { useRouter } from "next/router";

const EmptyState = () => {
  const router = useRouter();

  const goToNewMovie = () => {
      router.push("/new-movie");
  }


  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" text-white  font-bold text-6xl">
        Your movie list is empty
      </div>
      <div className=" w-fit mt-10">
        <Primary name="Add a new movie" style="px-10" onClick={goToNewMovie} />
      </div>
    </div>
  );
};

export default EmptyState;
