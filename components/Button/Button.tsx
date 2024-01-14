import React from "react";

interface PrimaryType {
  name: string;
  style: string;
}

export const Primary = ({ name, style }: PrimaryType) => {
  return (
    <div
      className={`bg-secondary text-white ${style} px-9 flex justify-center rounded-md py-2 cursor-pointer hover:opacity-70`}
    >
      {name}
    </div>
  );
};

export const Secondary = ({ name, style }: PrimaryType) => {
  return (
    <div
      className={`border border-white text-white ${style} px-9 flex justify-center rounded-md py-2 cursor-pointer hover:opacity-70`}
    >
      {name}
    </div>
  );
};
