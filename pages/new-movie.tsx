import React, { ChangeEvent, FormEvent, useState } from "react";
import { Primary, Secondary } from "../components/Button/Button";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Notify from "../utils/Notify";
import { postMovie, actions } from "../redux/slices/movieSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

interface FormData {
  title: string;
  year: number | string;
  image: string;
}

const NewMovie = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    year: "",
    image: "",
  });

  // Upload Image
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    onDrop: async (acceptedFiles) => {
      const renamedAcceptedFiles = acceptedFiles.map(
        (file) =>
          new File([file], `${file.name}_${+new Date()}`, {
            type: file.type,
          })
      );
      const newFile = renamedAcceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.log("img: ", newFile[0].preview);
      setImagePreview(newFile[0].preview);
      const formDataUpload = new FormData();
      formDataUpload.append("file", newFile[0]);
      formDataUpload.append("upload_preset", "spreuke-app");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dlzsibwl6/image/upload",
          formDataUpload
        )
        .then((response) => {
          //   console.log(response.data.secure_url)
          setFormData({
            ...formData,
            image: response.data.secure_url,
          });
        });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "year" ? Number(value) : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();

    if(!formData.image || !formData.title || !formData.year) {
      Notify('Please provide all data', 'error')
      return;
    }

    try {
      console.log(formData);
      setFormData({
        title: "",
        year: "",
        image: "",
      });
      dispatch(postMovie(formData) as any);
      Notify("Movie added", "success");
      setTimeout(() => {
        router.push("/home");
      }, 3000)
    } catch (e) {
      Notify("Something went wrong !!", "error");
    }
    
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className=" w-11/12 md:w-1/2 flex flex-col  items-center ">
        <div className="text-white  flex justify-center  md:justify-start w-full text-2xl md:text-4xl mt-20">
          Create a new movie
        </div>

        <div className=" mt-14 w-full flex flex-col md:flex-row justify-between gap-4 ">
          
        <div
          
            className=" md:hidden flex flex-col items-center gap-y-4"
          >
            <div className=" w-full">
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                placeholder="Title"
                className=" rounded-md p-2 w-full text-white outline-none  bg-gray-500 bg-opacity-20"
              />
            </div>
            <div className=" w-full">
              <input
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                type="number"
                placeholder="Publishing year"
                className=" w-full rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
              />
            </div>
            </div>
          
          <div
            {...getRootProps()}
            className=" w-full h-96 md:w-96 md:h-96 border border-dashed rounded-md flex flex-col cursor-pointer justify-center items-center bg-gray-500 bg-opacity-20"
          >
            <input {...getInputProps()} />
            <img
              src={imagePreview}
              alt=""
              className={`${
                imagePreview == "" ? "hidden" : ""
              } w-full h-96 md:w-96 md:h-96 rounded-md`}
            />

            <div
              className={`${
                imagePreview == "" ? "" : "hidden"
              } flex flex-col items-center`}
            >
              <div>
                <img src="drag.png" alt="" />
              </div>
              <div className=" text-white font-light">Drop an image here</div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center gap-y-4"
          >
            <div className="hidden md:block">
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                placeholder="Title"
                className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
              />
            </div>
            <div className="hidden md:block">
              <input
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                type="number"
                placeholder="Publishing year"
                className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
              />
            </div>
            <div className="flex w-full flex-row gap-2 mb-40 md:mb-4 ">
              <Link href="/home">
                <div
                  className={`border border-white w-full text-white px-9 flex justify-center rounded-md py-2 cursor-pointer hover:opacity-70`}
                >
                  Cancel
                </div>
              </Link>
              <Primary name="Submit" style="w-full" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewMovie;
