import React from "react";

const MovieCard = () => {
  return (
    <div className=" cursor-pointer bg-primary_v2 w-fit p-2 rounded-md">
      <div>
        <img src="test-image.png" alt="" />
      </div>
      <div className=" text-white text-xl my-4">title</div>
      <div className=" text-white font-light">2021</div>
    </div>
  );
};

export default MovieCard;
