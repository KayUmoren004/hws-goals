// Create a loading component that uses a lottie animation json to display a loading animation

import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/Spinner-1.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div
      className="loading
    flex flex-col justify-center items-center
    "
    >
      <Lottie options={defaultOptions} height={100} width={100} />
      {/* <p className="text-center text-white">
        <strong>Loading...</strong>
      </p> */}
    </div>
  );
};

export default Loading;
