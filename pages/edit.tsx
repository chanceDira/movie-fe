import React from "react";
import { Primary, Secondary } from "../components/Button/Button";

const edit = () => {
  return (
    <div className=" w-1/2">
      <div className="text-white text-4xl mt-20">Edit</div>

      <div className=" mt-14 flex flex-row justify-between ">
        <div className=" w-96 h-96 border border-dashed rounded-md flex flex-col cursor-pointer justify-center items-center bg-gray-500 bg-opacity-20">
          <div>
            <img src="drag.png" alt="" />
          </div>
          <div className=" text-white font-light">Drop an image here</div>
        </div>
        <div className=" flex flex-col items-center gap-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Publishing year"
              className=" rounded-md p-2 text-white outline-none  bg-gray-500 bg-opacity-20"
            />
          </div>
          <div className="flex flex-row gap-2 ">
            <Secondary name="Cancel" style="" />
            <Primary name="Update" style="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default edit;
