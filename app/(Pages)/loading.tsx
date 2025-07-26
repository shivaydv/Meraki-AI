import Loader from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full py-20 flex-grow flex justify-center items-center">
      {" "}
      <Loader />
    </div>
  );
};

export default Loading;
