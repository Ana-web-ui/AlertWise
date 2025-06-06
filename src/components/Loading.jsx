import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/4c3fcdac-1f45-482c-bc15-9e4958490ffe.json";

const Loading = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9"
    }}>
      <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  );
};

export default Loading;
