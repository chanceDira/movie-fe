import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import bottom from "../assets/bottom.svg";
import vectors from "../assets/png/Vectors.png";
import { Primary } from "../components/Button/Button";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Notify from "../utils/Notify";

const Home: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(!email || !password) {
      Notify('Please provide all data', 'error')
      return;
    }
    if (email === "dev@gmail.com" && password === "dev123") {
      router.push("/home");
    } else {
      console.log("Invalid credentials");
      Notify("Invalid credentials", "error");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className="rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="checkbox" />
            <span className=" text-white ml-2 font-light">Remember me</span>
          </div>
          <Primary name="Login" style="w-full" onClick={handleLogin} />
        </form>
      </div>
    </>
  );
};
export default Home;
