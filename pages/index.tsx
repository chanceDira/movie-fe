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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/slices/authSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      Notify("Please provide all data", "error");
      return;
    }

    try {
      const res = await dispatch(login({ email, password }) as any);
      setTimeout(() => {
        if (res.payload) {
          Notify("Logged in", "success");
          router.push("/home");
        } else {
          Notify("Invalid credentials", "error");
        }
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      Notify("Invalid credentials", "error");
      setIsLoading(false);
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
          <Primary
            name={isLoading ? "Loading" : "Login"}
            style="w-full"
            onClick={handleLogin}
          />
        </form>
      </div>
    </>
  );
};
export default Home;
