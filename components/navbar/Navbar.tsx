import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" absolute top-10 fixed  flex  flex-row justify-between items-center w-full">
      <div className="flex flex-row items-center">
        <span className=" text-white text-2xl mr-2">My movies</span>
        <span className=" cursor-pointer">
          <img src="addmovie.png" alt="" />
        </span>
      </div>
      <div className="flex flex-row items-center ">
        <span className="mr-2 text-2xl text-white">Logout</span>
        <span>
          <img src="logout.png" alt="" />
        </span>
      </div>
    </div>
  );
}
