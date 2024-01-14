import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import bottom from "../assets/bottom.svg";
import vectors from "../assets/png/Vectors.png";
import { Primary } from "../components/Button/Button";

const Home: NextPage = () => {
  return (
    <div className="relative w-full flex justify-center items-center bg-primary min-h-screen ">
      <form action="" className=" flex flex-col gap-6 items-center">
        <div>
          <span className=" text-white text-4xl font-bold">Sign in</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
          />
        </div>
        <div>
          <input type="checkbox" />
          <span className=" text-white ml-2 font-light">Remember me</span>
        </div>

        <Primary name="Login" style="w-full" />
      </form>
    </div>
  );
};
export default Home;
