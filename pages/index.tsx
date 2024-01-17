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
import { login, signup } from "../redux/slices/authSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      Notify("Please provide all data", "error");
      setIsLoading(false);
      return;
    }

    try {
      const res = await dispatch(login({ email, password }) as any);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (res.payload) {
          Notify("Logged in", "success");
          router.push("/home");
        } else {
          Notify("Invalid credentials", "error");
        }
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      Notify("Invalid credentials", "error");
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    console.log("here");
    if (!email || !password) {
      Notify("Please provide all data", "error");
      setIsLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        signup({ name, email, password, role }) as any
      );
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (res.payload) {
          Notify("Signed up !!", "success");
          router.push("/");
          setIsNewUser(false);
        } else {
          Notify("Invalid data", "error");
        }
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      Notify("Invalid data", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <div className="relative w-full flex justify-center items-center bg-primary min-h-screen ">
        <form
          action=""
          className={`${
            isNewUser && "hidden"
          } flex flex-col gap-6 items-center`}
        >
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
          <div className=" text-sm flex gap-2 text-white">
            <span>Don't have an account?</span>
            <span
              className=" text-secondary underline cursor-pointer font-bold"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              Sign Up
            </span>
          </div>
        </form>

        <form
          action=""
          className={`${
            !isNewUser && "hidden"
          } flex flex-col gap-6 items-center`}
        >
          <div>
            <span className=" text-white text-4xl font-bold">Sign Up</span>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            name={isLoading ? "Loading" : "Signup"}
            style="w-full"
            onClick={handleSignup}
          />
          <div className=" text-sm flex gap-2 text-white">
            <span>Do you have an account?</span>
            <span
              className=" text-secondary underline cursor-pointer font-bold"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              Sign in
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
export default Home;
