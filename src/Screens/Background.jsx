import Silk from "../components/Silk";

const Background = () => {
  return (
    <div className="fixed -z-[1] h-dvh w-full">
      <Silk
        speed={6}
        scale={0.9}
        color="#27276d"
        noiseIntensity={1.8}
        rotation={0}
      />
    </div>
  );
};

export default Background
