import unauthImg from "../assets/Unauthorized.png";

const Unauthorized = () => {
  return (
    <div
      className="h-screen w-full bg-contain bg-center bg-no-repeat bg-[#020617]"
      style={{
        backgroundImage: `url(${unauthImg})`,
      }}
    ></div>
  );
};

export default Unauthorized;
